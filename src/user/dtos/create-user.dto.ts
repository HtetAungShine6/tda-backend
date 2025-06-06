import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @ApiProperty()
    @IsDateString()
    dateOfBirth: string;
}