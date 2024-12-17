import { Body, Controller, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create.post.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiServiceUnavailableResponse,
} from '@nestjs/swagger';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @ApiOperation({ summary: 'Create a new post' })
  @ApiCreatedResponse({ description: 'Post created successfully' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiServiceUnavailableResponse({ description: 'Service unavailable' })
  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto);
  }
}
