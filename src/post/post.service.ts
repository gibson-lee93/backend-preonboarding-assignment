import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.entity';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostsRepository)
    private postsRepository: PostsRepository,
  ) {}

  async getPostById(id: string): Promise<Post> {
    const post = await this.postsRepository.findOne({ id });

    if (!post) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }

    return post;
  }

  createPost(createPostDto: CreatePostDto): Promise<Post> {
    return this.postsRepository.createPost(createPostDto);
  }

  async deletePost(id: string): Promise<void> {
    const post = await this.postsRepository.findOne({ id });
    if (!post) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }

    await this.postsRepository.delete(id);
  }

  async updatePost(id: string, post: string): Promise<Post> {
    const fourm = await this.getPostById(id);

    fourm.post = post;
    fourm.updated_at = new Date();
    await this.postsRepository.save(fourm);

    return fourm;
  }
}
