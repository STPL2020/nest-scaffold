import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsUUID } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'Title of the post',
    example: 'My First Blog Post'
  })
  @IsString()
  title: string;

  @ApiPropertyOptional({
    description: 'Content of the post',
    example: 'This is the content of my blog post...'
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({
    description: 'Status of the post',
    enum: ['draft', 'published'],
    default: 'draft',
    example: 'draft'
  })
  @IsOptional()
  @IsEnum(['draft', 'published'])
  status?: 'draft' | 'published';

  @ApiPropertyOptional({
    description: 'Locale of the post',
    default: 'en',
    example: 'en'
  })
  @IsOptional()
  @IsString()
  locale?: string;

  @ApiPropertyOptional({
    description: 'ID of the user who created the post',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsOptional()
  @IsUUID()
  createdById?: string;
} 