import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateExpenseDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ required: true })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  date: Date;
}