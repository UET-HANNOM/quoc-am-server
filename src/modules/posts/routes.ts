import { authMiddleware } from '@core/middleware';
import { ROUTE } from "@core/interfaces";
import { Router } from "express";
import { PostController } from ".";
export default class PostRoutes implements ROUTE {
  public path = "/api/v1/posts";
  public router = Router();

  public postController = new PostController();

  constructor() {
    this.initalizeRoutes();
  }

  private initalizeRoutes() {
    this.router.post(this.path,authMiddleware, this.postController.createPost); //POST
    this.router.put(this.path + "/:id", this.postController.updatePost);
    this.router.get(this.path, authMiddleware, this.postController.getAllPost);
    this.router.get(this.path + '/:id', authMiddleware, this.postController.getPostById);
    this.router.get(this.path + "/paging/:page", this.postController.getAllPostPaging)
    this.router.delete(this.path + "/:id", authMiddleware, this.postController.deletePost)
  }
}
