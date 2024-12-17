import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { getModelToken } from '@nestjs/mongoose';
import { HttpException } from '@nestjs/common';
import { CreatePostDto } from './dtos/create.post.dto';
import { Model } from 'mongoose';

describe('PostsService', () => {
  let service: PostsService;
  let postModel: Model<any>;
  let userModel: Model<any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getModelToken('Post'),
          useValue: {
            // Mock Mongoose model methods
            new: jest.fn().mockImplementation((data) => ({
              ...data,
              save: jest.fn().mockResolvedValue({
                ...data,
                _id: 'mockPostId',
              }),
            })),
            create: jest.fn().mockImplementation((data) => ({
              ...data,
              _id: 'mockPostId',
              save: jest.fn().mockResolvedValue({
                ...data,
                _id: 'mockPostId',
              }),
            })),
          },
        },
        {
          provide: getModelToken('User'),
          useValue: {
            findById: jest.fn().mockResolvedValue({
              _id: 'existingUserId',
              updateOne: jest.fn().mockResolvedValue({}),
            }),
          },
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    postModel = module.get(getModelToken('Post'));
    userModel = module.get(getModelToken('User'));
  });

  describe('createPost', () => {
    const mockCreatePostDto: CreatePostDto = {
      title: 'Test Post',
      contents: 'Test Contents',
      userId: 'existingUserId',
    };

    it('should successfully create a post', async () => {
      // Spy on model methods
      const createSpy = jest.spyOn(postModel, 'create');
      const findByIdSpy = jest.spyOn(userModel, 'findById');

      // Perform the service method
      const result = await service.createPost(mockCreatePostDto);

      // Assertions
      expect(findByIdSpy).toHaveBeenCalledWith(mockCreatePostDto.userId);
      expect(createSpy).toHaveBeenCalledWith({
        title: mockCreatePostDto.title,
        contents: mockCreatePostDto.contents,
      });
      expect(result).toBeDefined();
      expect(result._id).toBe('mockPostId');
    });

    it('should throw an error when user is not found', async () => {
      // Mock user not found
      jest.spyOn(userModel, 'findById').mockResolvedValue(null);

      // Expect the service to throw an HttpException
      await expect(service.createPost(mockCreatePostDto)).rejects.toThrow(
        HttpException,
      );
      await expect(service.createPost(mockCreatePostDto)).rejects.toThrow(
        'User not found',
      );
    });
  });
});
