
import { Entity, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../common/entities/base.entity';
import { Post } from '../posts/post.entity';

@Entity()
export class User extends BaseEntity {
  @ApiProperty({
    description: 'Username of the user',
    example: 'john_doe'
  })
  @Column()
  username: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john@example.com'
  })
  @Column()
  email: string;

  @ApiProperty({
    description: 'Password for the user account (hashed)',
    example: 'hashed_password_string'
  })
  @Column()
  password: string;

  @ApiProperty({
    description: 'Role of the user',
    enum: ['admin', 'user'],
    example: 'user'
  })
  @Column({ default: 'user' })
  role: 'admin' | 'user';

  @ApiProperty({
    description: 'Posts created by this user',
    type: () => [Post],
    isArray: true
  })
  @OneToMany(() => Post, (post) => post.createdBy)
  posts: Post[];
}
