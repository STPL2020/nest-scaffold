
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';

export class QueryParamsDto {
  @ApiPropertyOptional({
    description: 'Filter criteria in JSON format',
    example: '{"status":"published","locale":"en"}'
  })
  @IsOptional()
  @IsString()
  filters?: string;

  @ApiPropertyOptional({
    description: 'Locale filter for content',
    example: 'en'
  })
  @IsOptional()
  @IsString()
  locale?: string;

  @ApiPropertyOptional({
    description: 'Status filter for posts',
    enum: ['draft', 'published'],
    example: 'published'
  })
  @IsOptional()
  @IsEnum(['draft', 'published'])
  status?: 'draft' | 'published';

  @ApiPropertyOptional({
    description: 'Relations to populate (comma-separated)',
    example: 'createdBy,posts'
  })
  @IsOptional()
  @IsString()
  populate?: string;

  @ApiPropertyOptional({
    description: 'Fields to select (comma-separated)',
    example: 'id,title,createdAt'
  })
  @IsOptional()
  @IsString()
  fields?: string;

  @ApiPropertyOptional({
    description: 'Sort criteria (field:direction)',
    example: 'createdAt:desc'
  })
  @IsOptional()
  @IsString()
  sort?: string;

  @ApiPropertyOptional({
    description: 'Page number for pagination',
    example: 1
  })
  @IsOptional()
  @IsNumber()
  page?: number;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    example: 10
  })
  @IsOptional()
  @IsNumber()
  pageSize?: number;
}
