import { PostController } from ".";
import { ROUTE } from "@core/interfaces";
import { Router } from "express";
const multer = require("multer");
export default class BookRoutes implements ROUTE {
  public path = "/book";
  public router = Router();

  public bockController = new PostController();

  constructor() {
    this.initalizeRoutes();
  }

  private initalizeRoutes() {
    const upload = multer({
      storage: multer.memoryStorage(),
    });
    console.log("r")
    this.router.post(this.path + "/upload" , this.bockController.createBook);
  }
}
