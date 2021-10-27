import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../user/get-user.decorator';
import { User } from '../user/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as Forum } from './post.entity';
import { PostService } from './post.service';

@Controller('post')
@UseGuards(AuthGuard())
export class PostController {
  constructor(private postService: PostService) {}

  @Get('/:id')
  getPostById(@Param('id') id: string, @GetUser() user: User): Promise<Forum> {
    return this.postService.getPostById(id, user);
  }

  @Post()
  createPost(
    @Body() createPostDto: CreatePostDto,
    @GetUser() user: User,
  ): Promise<Forum> {
    return this.postService.createPost(createPostDto, user);
  }

  @Delete('/:id')
  deletePost(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.postService.deletePost(id, user);
  }

  @Patch('/:id')
  updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @GetUser() user: User,
  ): Promise<Forum> {
    const { post } = updatePostDto;
    return this.postService.updatePost(id, post, user);
  }
}
