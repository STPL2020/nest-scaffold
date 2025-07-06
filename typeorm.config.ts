import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from './src/users/user.entity';
import { Post } from './src/posts/post.entity';

const configService = new ConfigService();

export default new DataSource({
  type: 'sqlite',
  database: configService.get<string>('DB_DATABASE', 'db.sqlite'),
  entities: [User, Post],
  migrations: [__dirname + '/src/database/migrations/*{.ts,.js}'],
  migrationsRun: false,
  synchronize: false,
  logging: configService.get<boolean>('DB_LOGGING', false),
}); 