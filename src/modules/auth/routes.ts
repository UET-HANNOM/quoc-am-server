import { ROUTE } from "@core/interfaces";
import { Router } from "express";
import AuthController from "./controller";
export default class AuthRoutes implements ROUTE {
  public path = "/api/auth";
  public router = Router();

  public authController = new AuthController();

  constructor(){
    this.initalizeRoutes();
  }

  private initalizeRoutes(){
    this.router.post(this.path, this.authController.login) //POST
  }
}
