import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SignInDto } from './dtos/signin.dto';
import { UserInterface } from 'src/user/interfaces/user.interface';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,

        @Inject('UserInterface')
        private readonly userInterface: UserInterface
    ){}

    @Post('register')
    @ApiOperation({ summary: 'User Registration' })
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({ status: 201, description: 'User registered successfully' })
    @ApiResponse({ status: 409, description: 'User with this email already exists' })
    async register(@Body() createUserDto: CreateUserDto){
        return this.userInterface.createUser(createUserDto);
    }

    @Post('signIn')
    @Auth(AuthType.None)
    @ApiOperation({ summary: 'User Sign In' })
    @ApiBody({ type: SignInDto })
    async signIn(@Body() signInDto: any) {
        return this.authService.signIn(signInDto);
    }
}
