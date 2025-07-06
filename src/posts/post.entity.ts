
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseEntity } from '../common/entities/base.entity';
import { User } from '../users/user.entity';

@Entity()
export class Post extends BaseEntity {
  @ApiProperty({
    description: 'Title of the post',
    example: 'My First Blog Post'
  })
  @Column()
  title: string;

  @ApiPropertyOptional({
    description: 'Content of the post',
    example: 'This is the content of my blog post...'
  })
  @Column({ nullable: true })
  content: string;

  @ApiProperty({
    description: 'Status of the post',
    enum: ['draft', 'published'],
    example: 'draft'
  })
  @Column({ default: 'draft' })
  status: 'draft' | 'published';

  @ApiProperty({
    description: 'Locale of the post',
    example: 'en'
  })
  @Column({ default: 'en' })
  locale: string;

  @ApiPropertyOptional({
    description: 'ID of the user who created this post',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @Column({ nullable: true })
  createdById: string;

  @ApiPropertyOptional({
    description: 'User who created this post',
    type: () => User
  })
  @ManyToOne(() => User, (user) => user.posts, { nullable: true })
  @JoinColumn({ name: 'createdById' })
  createdBy: User;
}
