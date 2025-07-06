
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts/post.entity';
import { User } from './users/user.entity';
import { createAutoCrudController } from './common/controllers/auto-crud.controller';
import { QueryParserService } from './common/services/query-parser.service';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UpdateUserDto } from './users/dto/update-user.dto';
import { CreatePostDto } from './posts/dto/create-post.dto';
import { UpdatePostDto } from './posts/dto/update-post.dto';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Post, User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Post, User]),
  ],
  controllers: [
    createAutoCrudController(Post, 'posts', CreatePostDto, UpdatePostDto),
    createAutoCrudController(User, 'users', CreateUserDto, UpdateUserDto),
  ],
  providers: [QueryParserService],
})
export class AppModule {}
