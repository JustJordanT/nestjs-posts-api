import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from 'src/schemas/Post.schema';
import { Model } from 'mongoose';
import { CreatePostDto } from './dtos/create.post.dto';
import { User } from '../schemas/User.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('Post') private postModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createPost({ userId, ...createPostDto }: CreatePostDto) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new HttpException('User not found', 404);
    const post = await this.postModel.create(createPostDto);
    if (!post) throw new HttpException('Post not created', 500);

    await user.updateOne({ $push: { posts: post._id } });
    return post;
  }
}
