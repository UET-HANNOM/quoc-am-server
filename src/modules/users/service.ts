import { HttpException } from "@core/exceptions";
import { isEmptyObject, Logger } from "@core/utils";
import { TokenData } from "@modules/auth/interface";
import gravatar from "gravatar";
import bcrypt from "bcrypt";
import UserSchema from "./model";
import IUser from "./interface";
import jws from "jsonwebtoken";
import e from "express";
import { IPagination } from "@core/interfaces";

export default class UserService {
  public userSchema = UserSchema;
  public async createUser(model: any): Promise<TokenData> {
    if (isEmptyObject(model)) {
      throw new HttpException(400, "Model is empty");
    } else {
      const user = await this.userSchema.findOne({ email: model.email });
      if (user) {
        throw new HttpException(
          409,
          `Your email ${model.email} already exist.`
        );
      } else {
        const avatar = gravatar.url(model.email!, {
          size: "200",
          rating: "g",
          default: "mm",
        });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(model.password, salt);
        const createdUser: IUser = await this.userSchema.create({
          ...model,
          password: hashedPassword,
          avatar: avatar,
          date: Date.now(),
        });

        return this.createToken(createdUser);
      }
    }
  }

  public async updateUser(userId: string, model: any) {
    if (isEmptyObject(model)) {
      throw new HttpException(400, "Model is empty");
    } else {
      const user = await this.userSchema.findById(userId);
      if (!user) {
        throw new HttpException(400, `User id is not exist.`);
      } else {
        let updateUserById;
        if (model.password) {
          // Nếu muốn update passwork => băm pass
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(model.password, salt);
          updateUserById = await this.userSchema.findByIdAndUpdate(userId, {
            ...model,
            password: hashedPassword,
          });
        } else {
          updateUserById = await this.userSchema.findByIdAndUpdate(userId, {
            // neu khong update binh thuong
            ...model,
          });
        }

        if (!updateUserById)
          throw new HttpException(409, "You are not an user"); // Nếu update không thành công
        return updateUserById; // Trả về controller
      }
    }
  }

  public async getUserbyId(userId: string) {
    //getbyid
    const user = await this.userSchema.findById(userId);
    if (!user) {
      throw new HttpException(404, "User Id is not exist");
    } else {
      return user;
    }
  }

  public async getAllUser() {
    // lay tat ca user
    const user = await this.userSchema.find().exec();
    if (!user) {
      throw new HttpException(404, "Gãy");
    } else {
      return user;
    }
  }
  public async getAllUserPaging(
    keyword: string,
    page: number
  ): Promise<IPagination<IUser>> {
    // lay tat ca user theo gioi han, phan trang, search
    let query;
    if (keyword) { // search ban ghi co chua keyword
      query =this.userSchema.find({
        $or: [{email: keyword}, {firstname: keyword}, {lastname: keyword}]
      }).sort({ date: -1 });
    }else{
      query =this.userSchema.find().sort({ date: -1 });
    }
    const docs = await query
      .skip((page - 1) * 5) // bo qua bao nhieu ban ghi
      .limit(5) // lay tiep bao nhieu ban ghi
      .exec();
    const rows = await query.estimatedDocumentCount().exec(); // tong so ban ghi
    return {
      total: rows,
      page: page,
      pageSize: 5,
      item: docs,
    } as IPagination<IUser>;
  }
  private createToken(user: IUser): TokenData {
    const dataInToken: { id: string } = { id: user._id };
    const secret: string = process.env.JWT_TOKEN_SECRET || "cstech";
    const expriresIn: number = 60;
    return {
      token: jws.sign(dataInToken, secret, { expiresIn: expriresIn }),
    };
  }
}
