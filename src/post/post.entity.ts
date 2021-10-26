import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  post: string;

  @Column()
  author: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
