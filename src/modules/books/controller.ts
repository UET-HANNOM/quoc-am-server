import { NextFunction, Request, Response } from "express";
import BookService from "./service";
import formidable from "formidable";
export default class PostController {
  private bookService = new BookService();
  public createBook = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      var form = new formidable.IncomingForm({
        uploadDir: "./uploads",
        keepExtensions: true,
        maxFieldsSize: 10 * 1024 * 1024,
        multiples: true,
      });
      form.parse(req, (err, fields, files) => {
        if (err) {
          next(err);
          return;
        }
        res.json({ fields, files });
      });
    } catch (err) {
      next(err);
    }
  };
}
