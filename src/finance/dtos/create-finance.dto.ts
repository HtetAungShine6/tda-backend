import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateFinanceDto {
    @ApiProperty({ required: true })
    @IsOptional()
    @IsNumber()
    totalIncome?: number;

    @ApiProperty({ required: true })
    @IsOptional()
    @IsNumber()
    totalExpense?: number;
}