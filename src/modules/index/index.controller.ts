import { NextFunction, Request, Response } from "express";

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
      console.log(req.body);
      let text =
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
      res.status(200).json(text);
    } catch (err) {
      next(err);
    }
  };
}
