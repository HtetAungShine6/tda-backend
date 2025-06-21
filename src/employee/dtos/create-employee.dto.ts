import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsString } from "class-validator";
import { EmpStatus } from "../enums/emp-status.enum";

export class CreateEmployeeDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    phoneNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    address: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    position: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    status: EmpStatus;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    joinedDate: string;
}
