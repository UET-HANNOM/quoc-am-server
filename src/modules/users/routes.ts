import { ROUTE } from "@core/interfaces";
import { Router } from "express";
import UsersController from "./controller";
export default class UsersRoutes implements ROUTE {
  public path = "/api/users";
  public router = Router();

  public userController = new UsersController();

  constructor(){
    this.initalizeRoutes();
  }

  private initalizeRoutes(){
    this.router.post(this.path, this.userController.register) //POST
    this.router.put(this.path + "/:id", this.userController.updateUser) // update là Put
    this.router.get(this.path + "/:id", this.userController.getUserbyId)
    this.router.get(this.path, this.userController.getAllUser)
    this.router.get(this.path + "/paging/:page", this.userController.getAllUserPaging)
  }
}
