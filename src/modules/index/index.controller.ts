import { NextFunction, Request, Response } from "express";
const textData = require("./sampleData.json");
export default class IndexController {
  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);
      res.status(200).json("API is running ...");
    } catch (err) {
      next(err);
    }
  };
  public sampleData = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(textData);
    } catch (err) {
      next(err);
    }
  };
}
