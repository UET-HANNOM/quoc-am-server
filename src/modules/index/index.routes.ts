import { ROUTE } from "@core/interfaces";
import { Router } from "express";
import IndexController from "./index.controller";

export default class IndexRoutes implements ROUTE {
  public path = "/";
  public router = Router();

  public indexController = new IndexController();

  constructor(){
    this.initalizeRoutes();
  }

  private initalizeRoutes(){
    this.router.get(this.path, this.indexController.index);
    this.router.get(this.path + "sampleData", this.indexController.sampleData);
    this.router.post(this.path + "sampleData", this.indexController.sampleData);
  }
}
