import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { createAutoCrudController } from '../common/controllers/auto-crud.controller';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { QueryParserService } from 'src/common/services/query-parser.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  exports: [TypeOrmModule],
  controllers: [
    createAutoCrudController(Post, 'posts', CreatePostDto, UpdatePostDto),
  ],
  providers: [QueryParserService],
})
export class PostModule {}
