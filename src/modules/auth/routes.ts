import { ROUTE } from "@core/interfaces";
import { Router } from "express";
import UsersController from "./controller";
export default class AuthRoutes implements ROUTE {
  public path = "/api/users";
  public router = Router();

  public userController = new UsersController();

  constructor(){
    this.initalizeRoutes();
  }

  private initalizeRoutes(){
    this.router.post(this.path, this.userController.register) //POST
  }
}
