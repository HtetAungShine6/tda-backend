import { IsEnum } from "class-validator";
import { EmpStatus } from "../enums/emp-status.enum";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateEmployeeStatusDto {
    @ApiProperty({ enum: EmpStatus, description: 'Employee status: active, inactive, or on_leave' })
    @IsEnum(EmpStatus)
    status: EmpStatus;
}