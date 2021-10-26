import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as Forum } from './post.entity';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('/:id')
  getPostById(@Param('id') id: string): Promise<Forum> {
    return this.postService.getPostById(id);
  }

  @Post()
  createPost(@Body() createPostDto: CreatePostDto): Promise<Forum> {
    return this.postService.createPost(createPostDto);
  }

  @Delete('/:id')
  deletePost(@Param('id') id: string): Promise<void> {
    return this.postService.deletePost(id);
  }
}
