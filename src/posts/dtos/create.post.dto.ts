import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'Title of the post',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  // @Max(100)
  title: string;
  @ApiProperty({
    description: 'Contents of the post',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  // @Max(1000)
  contents: string;
  @ApiProperty({
    description: 'User ID of the post creator',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  userId: string;
}
