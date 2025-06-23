import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Post,
  Query,
} from '@nestjs/common';
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
    private readonly userInterface: UserInterface,
  ) {}

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
    return this.userInterface.findUserById(id);
  }

  @Get('findAll')
  @Auth(AuthType.None)
  async findAllUsers() {
    return this.userInterface.findAllUsers();
  }
}
