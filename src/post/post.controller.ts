import { Controller, Get, Param } from '@nestjs/common';
import { Post } from './post.entity';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('/:id')
  getPostById(@Param('id') id: string): Promise<Post> {
    return this.postService.getPostById(id);
  }
}
