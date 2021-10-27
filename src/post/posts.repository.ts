import { User } from '../user/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.entity';
import { GetPostsFilterDto } from './dto/get-posts-filter.dto';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Post)
export class PostsRepository extends Repository<Post> {
  async getPosts(
    filterDto: GetPostsFilterDto,
  ): Promise<{ count: number; data: Post[] }> {
    const { limit, offset } = filterDto;

    const query = this.createQueryBuilder('post');

    if (limit) {
      query.limit(Number(limit));
    }

    if (offset) {
      query.offset(Number(offset));
    }

    try {
      const posts = await query.getMany();
      return {
        count: posts.length,
        data: [...posts],
      };
      // return posts;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createPost(createPostDto: CreatePostDto, user: User): Promise<Post> {
    const { post } = createPostDto;

    const userPost = this.create({
      post,
      author: user.username,
      created_at: new Date(),
      user,
    });

    await this.save(userPost);
    return userPost;
  }
}
