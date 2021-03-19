import { HttpException } from "@core/exceptions";
import { isEmptyObject, Logger } from "@core/utils";
import { TokenData } from "@modules/auth/interface";
import gravatar from "gravatar";
import bcrypt from "bcrypt";
import UserSchema from "./model";
import IUser from "./interface";
import jws from "jsonwebtoken";
import e from "express";

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

  public async updateUser(userId: string, model: any){
    if (isEmptyObject(model)) {
      throw new HttpException(400, "Model is empty");
    } else {
      const user = await this.userSchema.findById(userId);
      if (!user) {
        throw new HttpException(400, `User id is not exist.`);
      } else {
        let updateUserById;
        if (model.password) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(model.password, salt);
          updateUserById = await this.userSchema.findByIdAndUpdate(userId, {
            ...model,
            password: hashedPassword,
          });
        } else {
          updateUserById = await this.userSchema.findByIdAndUpdate(userId, {
            ...model,
          });
        }
        
        if(!updateUserById) throw new HttpException(409, "You are not an user")
        return updateUserById
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
  private createToken(user: IUser): TokenData {
    const dataInToken: { id: string } = { id: user._id };
    const secret: string = process.env.JWT_TOKEN_SECRET || "cstech";
    const expriresIn: number = 60;
    return {
      token: jws.sign(dataInToken, secret, { expiresIn: expriresIn }),
    };
  }
}
