import { IUser } from "@modules/auth";
import { NextFunction, Request, Response } from "express";
import IProfile from "./interface";
import ProfileService from "./service";

class ProfileController {
  private profileService = new ProfileService();

  public getCurrentProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.user.id;
    try {
      const result: Partial<IUser> = await this.profileService.getCurrentProfile(
        userId
      );
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };
  public getAllProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result: Partial<IUser>[] = await this.profileService.getAllProfile();
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };
  public createProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userData = req.body;
    const userId = req.user.id;
    console.log("object")
    try {
      const result: IProfile = await this.profileService.createProfile(
        userId,
        userData
      );
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };
  public getProfileById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userId: string = req.params.id;
    try {
      const result: Partial<IUser> = await this.profileService.getCurrentProfile(
        userId
      );
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };
  public deleteProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userId: string = req.params.id;
    try {
      await this.profileService.deleteProfile(userId);
      res.status(200);
    } catch (err) {
      next(err);
    }
  };
}

export default ProfileController;
