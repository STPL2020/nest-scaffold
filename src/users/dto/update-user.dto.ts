import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, IsEnum } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'Username of the user',
    example: 'john_doe'
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({
    description: 'Email address of the user',
    example: 'john@example.com'
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: 'Password for the user account',
    example: 'securepassword123'
  })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiPropertyOptional({
    description: 'Role of the user',
    enum: ['admin', 'user'],
    example: 'user'
  })
  @IsOptional()
  @IsEnum(['admin', 'user'])
  role?: 'admin' | 'user';
} 