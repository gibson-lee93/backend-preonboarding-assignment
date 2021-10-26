import { EntityRepository, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.entity';

@EntityRepository(Post)
export class PostsRepository extends Repository<Post> {
  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    const { post } = createPostDto;

    const userPost = this.create({
      post,
      created_at: new Date(),
    });

    await this.save(userPost);
    return userPost;
  }
}
