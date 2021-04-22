import { UserSchema } from "@modules/users";
import { HttpException } from "@core/exceptions";
import { BookSchema } from ".";
const firebase = require("./firebase");
export default class BookService {
  private bookSchema = BookSchema;

  public async createNewBook(
    userId: string,
    // title: string,
    // author: string,
    // description: string,
    file: any,
    // imgSrc: string
  ) {
    // const user = await UserSchema.findById(userId).select("-password").exec();
    // if (!user) throw new HttpException(400, "User id is not exist");
    const blob = firebase.bucket.file(file.originalname);

    const blobWriter = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });
    blobWriter.on("error", (err: any) => {
      console.log(err);
    });

    blobWriter.on("finish", (res:any) => {
      const url = `https://storage.googleapis.com/${firebase.bucket.name}/${file.originalname}`;
      console.log(url);
      console.log("finish", res);
    });

    blobWriter.end(file.buffer);debugger
    // const newbook = await this.bookSchema.create({
    //   title: title,
    //   author: author,
    //   description: description,
    //   contributors: userId,
    //   imgSrc: "",
    // });
    console.log(firebase.bucket.name)
    let r = firebase.bucket.file("Screenshot 2021-04-07 113415.png")
    let l = await r.download()
    return l
  }
}
