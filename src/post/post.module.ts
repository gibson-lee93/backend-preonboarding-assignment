import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsRepository } from './posts.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PostsRepository])],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
