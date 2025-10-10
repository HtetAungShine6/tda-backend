import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { EmpStatus } from "../enums/emp-status.enum";

export class CreateEmployeeDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    phoneNumber: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    address: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    position: string;

    @ApiProperty({ enum: EmpStatus, description: 'Employee status', required: true, default: EmpStatus.INACTIVE })
    @IsEnum(EmpStatus)
    status: EmpStatus;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    joinedDate: Date;
}
