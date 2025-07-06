
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts/post.entity';
import { User } from './users/user.entity';
import { UserModule } from './users/user.module';
import { PostModule } from './posts/post.module';
import { PrettyLoggerService } from './common/services/logger.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Post, User],
      synchronize: true,
    }),
    UserModule,
    PostModule,
  ],
  providers: [PrettyLoggerService],
})
export class AppModule {}
