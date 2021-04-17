import { HttpException } from "@core/exceptions";
import { IPagination } from "@core/interfaces";
import { UserSchema } from "@modules/users";
import { PostSchema } from ".";
import IPost, { IComment, ILike } from "./interface";

export default class PostService {
  public async createPost(userId: string, postDto: any): Promise<IPost> {
    const user = await UserSchema.findById(userId).select("-password").exec();
    if (!user) throw new HttpException(400, "User id is not exist");

    const newPost = new PostSchema({
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
    const post = await PostSchema.findByIdAndUpdate(
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
    const posts = await PostSchema.find().sort({ date: -1 }).exec();
    return posts;
  }

  public async getPostById(useId: string): Promise<IPost> {
    const post = await PostSchema.findById(useId).exec();
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
      query = PostSchema.find({
        $or: [{ text: keyword }, { title: keyword }],
      }).sort({ date: -1 });
    } else {
      query = PostSchema.find().sort({ date: -1 });
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
    const post = await PostSchema.findById(postId).exec();
    if (!post) {
      throw new HttpException(400, "Post not found");
    }
    if (post.user.toString() !== userId) {
      throw new HttpException(400, "User is not authorized");
    }

    await post.remove();
    return post;
  }

  public async likePost(userId: string, postId: string): Promise<ILike[]> {
    const post = await PostSchema.findById(postId).exec();
    if (!post) {
      throw new HttpException(400, "Post is not exist");
    }
    if (post.likes.some((like: ILike) => like.user.toString() === userId)) {
      throw new HttpException(400, "Post already liked");
    }
    post.likes.unshift({ user: userId });

    await post.save();
    return post.likes;
  }

  public async unlikePost(userId: string, postId: string): Promise<ILike[]> {
    const post = await PostSchema.findById(postId).exec();
    if (!post) {
      throw new HttpException(400, "Post is not exist");
    }
    if (!post.likes.some((like: ILike) => like.user.toString() === userId)) {
      throw new HttpException(400, "Post has not been like");
    }
    post.likes = post.likes.filter((like) => like.user.toString() !== userId);

    await post.save();
    return post.likes;
  }

  public async addComment(text:string, userId: string, postId: string): Promise<IComment[]> {
    const post = await PostSchema.findById(postId).exec();
    if (!post) throw new HttpException(400, 'Post not found');

    const user = await UserSchema.findById(userId)
      .select('-password')
      .exec();

    if (!user) throw new HttpException(400, 'User not found');

    const newComment = {
      text: text,
      name: user.firstname + ' ' + user.lastname,
      avatar: user.avatar,
      user: userId,
    };

    post.comments.unshift(newComment as IComment);
    await post.save();
    return post.comments;
  }
  public async removeComment(
    commentId: string,
    postId: string,
    userId: string
  ): Promise<IComment[]> {
    const post = await PostSchema.findById(postId).exec();
    if (!post) throw new HttpException(400, 'Post not found');

    const comment = post.comments.find((c) => c._id.toString() === commentId);
    if (!comment) throw new HttpException(400, 'Comment not found');

    if (comment.user.toString() !== userId)
      throw new HttpException(401, 'User not authorized');

    post.comments = post.comments.filter(
      ({ _id }) => _id.toString() !== commentId
    );
    await post.save();
    return post.comments;
  }
}
