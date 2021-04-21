import { NextFunction, Request, Response } from 'express';
import BookService from "./service";
export default class PostController {
    private bookService = new BookService();
    public createBook = async (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      try {
       const  userId = req.body.userId;
        // title: string,
        // author: string,
        // description: string,
        const file=  req.file;
        // imgSrc: string
        console.log("c", file)
        const result = await this.bookService.createNewBook(userId, file);
        res.status(201).json(result);
      } catch (err) {
        next(err);
      }
    };
}