import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor(userId: string) {
    super(`User with id '${userId}' not found`, HttpStatus.NOT_FOUND);
  }
}

export class UserSettingsNotFoundException extends HttpException {
  constructor(userId: string) {
    super(
      `User settings with user id ${userId} not found`,
      HttpStatus.NOT_FOUND,
    );
  }
}

export class PostNotFoundException extends HttpException {
  constructor(postId: string) {
    super(`Post with id ${postId} not found`, HttpStatus.NOT_FOUND);
  }
}
