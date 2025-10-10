import { ApiProperty } from "@nestjs/swagger";
import { ApplicantStatus } from "../enums/applicant-status.enum";
import { IsEnum } from "class-validator";

export class UpdateApplicantStatusDto {
    @ApiProperty({ required: true, enum: ApplicantStatus })
    @IsEnum(ApplicantStatus)
    status: ApplicantStatus;
}