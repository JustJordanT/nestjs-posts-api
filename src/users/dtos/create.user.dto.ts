import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserSettingsDto {
  @ApiProperty({
    description: 'Receive notifications',
    required: false,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  receiveNotifications?: boolean;

  @ApiProperty({
    description: 'Receive emails',
    required: false,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  receiveEmails?: boolean;

  @ApiProperty({
    description: 'Receive SMS',
    required: false,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  receiveSms?: boolean;
}

export class CreateUserDto {
  @ApiProperty({
    description: 'Username',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Display name',
    required: false,
  })
  @IsOptional()
  @IsString()
  displayName?: string;

  @ApiProperty({
    description: 'User settings',
    required: false,
    type: CreateUserSettingsDto,
  })
  @IsOptional()
  @ValidateNested()
  settings?: CreateUserSettingsDto;
}
