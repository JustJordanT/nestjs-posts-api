import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create.user.dto';
import mongoose from 'mongoose';
import { UpdateUserDto } from './dtos/update.user.dto';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiServiceUnavailableResponse,
} from '@nestjs/swagger';
import { UserNotFoundException } from '../commons/execptions';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: CreateUserDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiServiceUnavailableResponse({ description: 'Service unavailable' })
  @Post()
  // @UsePipes(new ValidationPipe())
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users' })
  @ApiServiceUnavailableResponse({ description: 'Service unavailable' })
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, description: 'Return user by id' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new UserNotFoundException(id);
    const findUser = await this.userService.getUserById(id);
    if (!findUser) throw new UserNotFoundException(id);
    return findUser;
  }

  @ApiOperation({ summary: 'Update user by id' })
  @ApiResponse({ status: 200, description: 'Return user updated' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserdDto: UpdateUserDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new UserNotFoundException(id);
    const findUser = await this.userService.getUserById(id);
    if (!findUser) throw new UserNotFoundException(id);
    return await this.userService.updateUser(id, updateUserdDto);
  }

  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new UserNotFoundException(id);
    const deletedUser = await this.userService.deleteUser(id);
    if (!deletedUser) throw new UserNotFoundException(id);
    return;
  }
}
