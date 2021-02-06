import { NextFunction, Request, Response } from "express";

export default class IndexController {
  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json("API is running ...");
    } catch (err) {
      next(err);
    }
  };
}
