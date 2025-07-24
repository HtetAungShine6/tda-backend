import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { read } from 'fs';
import { UserInterface } from './interfaces/user.interface';
import { CreateUserProvider } from './providers/create-user.provider';
import { throwIfNotFound } from 'src/helpers/throwIfNotFound';

@Injectable()
export class UserServiceImpl implements UserInterface {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,

    /**
     * The provider responsible for creating users.
     */
    private readonly createUserProvider: CreateUserProvider,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.createUserProvider.createUser(createUserDto);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create a user: ',
        error,
      );
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    email = email.replace('%40', '@');
    const user = await this.userModel.findOne({ email }).exec();
    return throwIfNotFound(user, email, 'User') as User;
  }

  async findUserById(id: string): Promise<Partial<User> | null> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const userObject = user.toObject() as Record<string, any>;
      delete userObject.password;
      return userObject;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to find user by ID: ${error.message}`,
      );
    }
  }

  async findAllUsers(): Promise<User[]> {
    try {
      const users = await this.userModel.find().exec();
      if (!users || users.length === 0) {
        throw new NotFoundException('No users found');
      }
      return users;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to find all users: ',
        error,
      );
    }
  }
}
