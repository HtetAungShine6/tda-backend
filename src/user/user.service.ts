import { ConflictException, forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { read } from 'fs';
import { UserInterface } from './interfaces/user.interface';
import { CreateUserProvider } from './providers/create-user.provider';

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
        return await this.createUserProvider.createUser(createUserDto);
    }

    async findUserByEmail(email: string): Promise<User | null> {
        email = email.replace("%40", "@"); 
        const user = await this.userModel.findOne({ email }).exec();
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async findUserById(id: string): Promise<Partial<User> | null> {
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const userObject = user.toObject() as Record<string, any>;
        delete userObject.password; 
        return userObject;
    }
    async findAllUsers(): Promise<User[]> {
        const users = await this.userModel.find().exec();
        if (!users || users.length === 0) {
            throw new NotFoundException('No users found');
        }
        return users;
    }
}
