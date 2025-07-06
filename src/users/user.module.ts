import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { createAutoCrudController } from '../common/controllers/auto-crud.controller';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryParserService } from 'src/common/services/query-parser.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule],
  controllers: [
    createAutoCrudController(User, 'users', CreateUserDto, UpdateUserDto),
  ],
  providers: [QueryParserService],
})
export class UserModule {}
