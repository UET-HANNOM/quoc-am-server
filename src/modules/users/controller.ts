import { TokenData } from "@modules/auth/interface";
import { NextFunction, Request, Response } from "express";
import UserService from "./service";

export default class UsersController {
  private userService = new UserService();
  public register = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const model : any = req.body;
      console.log(model)
      const tokenData: TokenData = await this.userService.createUser(model);
      res.status(201).json(tokenData);
    } catch (err) {
      next(err);
    }
  };
  public getUserbyId = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.getUserbyId(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };
  
  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.updateUser(req.params.id,req.body); // chuyền vào id và model
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
  public getAllUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.getAllUser();
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
  public getAllUserPaging = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page  = Number(req.params.page);
      const keyword = req.query.keyword || "";
      const result = await this.userService.getAllUserPaging(keyword.toString(), page);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.userService.deleteUser(req.params.id)
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  } 
}
