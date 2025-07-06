import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, IsEnum } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Username of the user',
    example: 'john_doe'
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john@example.com'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password for the user account',
    example: 'securepassword123'
  })
  @IsString()
  password: string;

  @ApiPropertyOptional({
    description: 'Role of the user',
    enum: ['admin', 'user'],
    default: 'user',
    example: 'user'
  })
  @IsOptional()
  @IsEnum(['admin', 'user'])
  role?: 'admin' | 'user';
} 