import { ConflictException, forwardRef, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../user.schema";
import { Model } from "mongoose";
import { HashingProvider } from "src/auth/providers/hashing.provider";
import { CreateUserDto } from "../dtos/create-user.dto";

@Injectable()
export class CreateUserProvider {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,

        @Inject(forwardRef(() => HashingProvider))
        private readonly hashingProvider: HashingProvider,
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const {email} = createUserDto;
        const existingUser = await this.userModel.findOne({email}).exec();

        if (existingUser) {
            throw new ConflictException('User with this email already exists')
        }

        try {
            const hashedPassword = await this.hashingProvider.hashPassword(createUserDto.password);
            const newUser = new this.userModel({
                ...createUserDto,
                password: hashedPassword,
            });
            return await newUser.save();
        } catch (error) {
            throw new InternalServerErrorException('Failed to create a user: ', error);
        }
    }
}