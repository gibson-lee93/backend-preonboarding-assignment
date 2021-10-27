import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../user/get-user.decorator';
import { User } from '../user/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostsFilterDto } from './dto/get-posts-filter.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as Forum } from './post.entity';
import { PostService } from './post.service';

@Controller('posts')
@UseGuards(AuthGuard())
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  getPosts(
    @Query() filterDto: GetPostsFilterDto,
  ): Promise<{ count: number; data: Forum[] }> {
    return this.postService.getPosts(filterDto);
  }

  @Get('/:id')
  getPostById(@Param('id') id: string, @GetUser() user: User): Promise<Forum> {
    return this.postService.getPostById(id, user);
  }

  @Post()
  createPost(
    @Body() createPostDto: CreatePostDto,
    @GetUser() user: User,
  ): Promise<{ data: Forum }> {
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
  ): Promise<{ data: Forum }> {
    const { post } = updatePostDto;
    return this.postService.updatePost(id, post, user);
  }
}
