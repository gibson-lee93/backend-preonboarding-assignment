import { User } from '../user/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.entity';

@EntityRepository(Post)
export class PostsRepository extends Repository<Post> {
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
