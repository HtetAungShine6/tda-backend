import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePayrollDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  employeeId: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  totalQuantity: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  totalSalary: number;
}
