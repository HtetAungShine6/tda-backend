import { Body, Controller, Get, Inject, NotFoundException, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserInterface } from './interfaces/user.interface';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(
        @Inject('UserInterface')
        private readonly userInterface: UserInterface
    ){} 

    @Get('findByEmail')
    async findUser(@Query('email') email: string) {
        console.log('Finding user by email:', email);
        const user = await this.userInterface.findUserByEmail(email);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }
}