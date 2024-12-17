import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ValidationPipe } from '@nestjs/common';
import { CreatePostDto } from './create.post.dto';

describe('CreatePostDto', () => {
  let validationPipe: ValidationPipe;

  beforeAll(async () => {
    // Set up a NestJS validation pipe for more comprehensive testing
    validationPipe = new ValidationPipe({
      whitelist: true, // strips non-whitelisted properties
      forbidNonWhitelisted: true, // throws error on extra properties
      transform: true, // automatically transform payloads
    });
  });

  // Most of the previous tests remain the same
  it('should create a valid DTO', async () => {
    const postDto = plainToClass(CreatePostDto, {
      title: 'Test Post Title',
      contents: 'This is the post contents',
      userId: '123123123',
    });

    const errors = await validate(postDto);
    expect(errors.length).toBe(0);
  });

  // NestJS-specific validation test
  it('should use ValidationPipe to validate DTO', async () => {
    const postDto = {
      title: 'Test Post Title',
      contents: 'This is the post contents',
      userId: '123123123',
    };

    try {
      await validationPipe.transform(postDto, {
        type: 'body',
        metatype: CreatePostDto,
      });
    } catch (error) {
      // This should not throw an error for a valid DTO
      fail(`Validation should pass for a valid DTO: ${error.message}`);
    }
  });

  // Test invalid scenarios with ValidationPipe
  it('should fail validation with ValidationPipe for empty title', async () => {
    const postDto = {
      title: '',
      contents: 'Valid contents',
      userId: 'user123',
    };

    await expect(
      validationPipe.transform(postDto, {
        type: 'body',
        metatype: CreatePostDto,
      }),
    ).rejects.toThrow();
  });

  // Additional NestJS-specific tests can be added here
});
