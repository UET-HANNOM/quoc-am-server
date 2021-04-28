import { authMiddleware } from "@core/middleware";
import { ROUTE } from "@core/interfaces";
import { Router } from "express";
import ScanFile from ".";
export default class ScanRoutes implements ROUTE {
  public path = "/api/scan";
  public router = Router();

  public scanTool = new ScanFile();

  constructor() {
    this.initalizeRoutes();
  }

  private initalizeRoutes() {
    this.router.post(this.path, this.scanTool.scan); //POST
  }
}
