import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
