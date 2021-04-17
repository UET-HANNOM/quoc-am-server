import { HttpException } from "@core/exceptions";
import { IPagination } from "@core/interfaces";
import { UserSchema } from "@modules/users";
import { PostScheme } from ".";
import IPost from "./interface";

export default class PostService {
  public async createPost(userId: string, postDto: any): Promise<IPost> {
    const user = await UserSchema.findById(userId).select("-password").exec();
    if (!user) throw new HttpException(400, "User id is not exist");

    const newPost = new PostScheme({
      title: postDto.title,
      text: postDto.text,
      name: user.firstname + " " + user.lastname,
      avatar: user.avatar,
      user: userId,
    });
    const post = await newPost.save();
    return post;
  }

  public async updatePost(postId: string, postDto: any): Promise<IPost> {
    const post = await PostScheme.findByIdAndUpdate(
      postId,
      { ...postDto },
      { new: true }
    ).exec();
    if (!post) {
      throw new HttpException(400, "Post is not found");
    }
    return post;
  }

  public async getAllPost(): Promise<IPost[]> {
    const posts = await PostScheme.find().sort({ date: -1 }).exec();
    return posts;
  }

  public async getPostById(useId: string): Promise<IPost> {
    const post = await PostScheme.findById(useId).exec();
    if (!post) {
      throw new HttpException(400, "Post_id is not exit");
    }
    return post;
  }
  public async getAllPostPaging(
    keyword: string,
    page: number
  ): Promise<IPagination<IPost>> {
    // lay tat ca user theo gioi han, phan trang, search
    let query;
    if (keyword) {
      // search ban ghi co chua keyword
      query = PostScheme.find({
        $or: [{ text: keyword }, { title: keyword }],
      }).sort({ date: -1 });
    } else {
      query = PostScheme.find().sort({ date: -1 });
    }
    const docs = await query
      .skip((page - 1) * 5) // bo qua bao nhieu ban ghi
      .limit(5) // lay tiep bao nhieu ban ghi
      .exec();
    const rows = await query.estimatedDocumentCount().exec(); // tong so ban ghi
    return {
      total: rows,
      page: page,
      pageSize: 5,
      item: docs,
    } as IPagination<IPost>;
  }

  public async deletePost(userId: string, postId: string): Promise<IPost> {
    const post = await PostScheme.findById(postId).exec();
    if (!post) {
      throw new HttpException(400, "Post not found");
    }
    if (post.user.toString() !== userId) {
      throw new HttpException(400, "User is not authorized");
    }

    await post.remove();
    return post;
  }
}
