
import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { PostModule } from './posts/post.module';
import { PrettyLoggerService } from './common/services/logger.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    UserModule,
    PostModule,
    HealthModule,
  ],
  providers: [PrettyLoggerService],
})
export class AppModule {}
