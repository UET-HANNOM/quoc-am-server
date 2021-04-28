import { NextFunction, Request, Response } from "express";
import Formidable from "formidable";
import fs from "fs";
import scanService from "./services";
var obj;
export default class ScanFile {
  private scanService = new scanService();
  public scan = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      var form = new Formidable.IncomingForm({
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
        const result = this.scanService.scan(files.path);
        res.status(200).json(result);
        // res.json({ fields, files });
      });
    } catch (error) {
      next(error);
    }
  };
}
