import { Body, Controller, Get, Inject, NotFoundException, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserInterface } from './interfaces/user.interface';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(
        @Inject('UserInterface')
        private readonly userInterface: UserInterface
    ){} 

    // @Get('findByEmail')
    // async findUser(@Query('id') email: string) {
    //     console.log('Finding user by email:', email);
    //     const user = await this.userInterface.findUserByEmail(email);
    //     if (!user) {
    //         throw new NotFoundException('User not found');
    //     }
    //     return user;
    // }

    @Get('findById')
    async findUserById(@Query('id') id: string) {
        console.log('Finding user by ID:', id);
        const user = await this.userInterface.findUserById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    @Get('findAll')
    @Auth(AuthType.None)
    async findAllUsers() {
        console.log('Finding all users');
        const users = await this.userInterface.findAllUsers();
        if (!users || users.length === 0) {
            throw new NotFoundException('No users found');
        }
        return users;
    }
}