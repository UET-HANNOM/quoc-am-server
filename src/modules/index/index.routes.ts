import { ROUTE } from "core/interfaces";
import { Router } from "express";
import IndexController from "./index.controller";

export default class InderRoutes implements ROUTE {
  public path = "/";
  public router = Router();

  public indexController = new IndexController();

  constructor(){
    this.initalizeRoutes();
  }

  private initalizeRoutes(){
    this.router.get(this.path, this.indexController.index)
  }
}
