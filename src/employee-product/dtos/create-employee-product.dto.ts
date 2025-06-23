import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateEmployeeProductDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    employeeId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    productId: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    quantity: number;
}