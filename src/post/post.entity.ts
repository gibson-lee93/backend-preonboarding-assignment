import { User } from '../user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  post: string;

  @Column({ nullable: true })
  author: string;

  @Column()
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;

  @ManyToOne((_type) => User, (user) => user.posts, { eager: false })
  user: User;
}
