import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ApplicantStatus } from "../enums/applicant-status.enum";
import { Type } from "class-transformer";

export class CreateApplicantDto {
    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    information: string;

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    position: string;

    @ApiProperty({ required: true, enum: ApplicantStatus,default: ApplicantStatus.APPLIED })
    @IsEnum(ApplicantStatus)
    status: ApplicantStatus;

    @ApiProperty({ required: true })
    @IsDate()
    @Type(() => Date)
    date: Date
}