import { TokenData } from "@modules/auth/interface";
import { NextFunction, Request, Response } from "express";
import UserService from "./service";

export default class UsersController {
  private userService = new UserService();
  public register = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const model : any = req.body;
      const tokenData: TokenData = await this.userService.createUser(model);
      res.status(201).json(tokenData);
    } catch (err) {
      next(err);
    }
  };
}
