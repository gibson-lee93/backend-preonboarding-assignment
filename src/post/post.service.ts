import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostsFilterDto } from './dto/get-posts-filter.dto';
import { Post } from './post.entity';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostsRepository)
    private postsRepository: PostsRepository,
  ) {}

  getPosts(
    filterDto: GetPostsFilterDto,
  ): Promise<{ count: number; data: Post[] }> {
    return this.postsRepository.getPosts(filterDto);
  }

  async getPostById(id: string, user: User): Promise<Post> {
    const post = await this.postsRepository.findOne({ id, user });

    if (!post) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }

    return post;
  }

  createPost(
    createPostDto: CreatePostDto,
    user: User,
  ): Promise<{ data: Post }> {
    return this.postsRepository.createPost(createPostDto, user);
  }

  async deletePost(id: string, user: User): Promise<{ message: string }> {
    const post = await this.postsRepository.findOne({ id, user });

    if (!post) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }

    await this.postsRepository.delete(id);
    return { message: 'Successfully deleted' };
  }

  async updatePost(
    id: string,
    post: string,
    user: User,
  ): Promise<{ data: Post }> {
    const forum = await this.getPostById(id, user);

    forum.post = post;
    forum.updated_at = new Date();
    await this.postsRepository.save(forum);

    return { data: forum };
  }
}
