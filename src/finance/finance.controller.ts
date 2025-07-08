import {
  Body,
  Controller,
  Get,
  Inject,
  Injectable,
  Post,
  Query,
} from '@nestjs/common';
import { FinanceInterface } from './interface/finance.interface';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { CreateFinanceDto } from './dtos/create-finance.dto';

@Controller('finance')
export class FinanceController {
  constructor(
    @Inject('FinanceInterface')
    private readonly financeInterface: FinanceInterface,
  ) {}

  @Post()
  @ApiBody({ type: CreateFinanceDto })
  createFinance(@Body() createFinanceDto: CreateFinanceDto) {
    return this.financeInterface.createFinance(createFinanceDto);
  }

  @Get()
  @ApiQuery({
    name: 'month',
    required: false,
  })
  @ApiQuery({
    name: 'year',
    required: false,
  })
  findByMonthAndYear(
    @Query('month') month: string,
    @Query('year') year: string,
  ) {
    if (!month && !year) {
      return this.financeInterface.findAllFinances();
    }

    const parsedMonth = parseInt(month, 10);
    const parsedYear = parseInt(year, 10);
    return this.financeInterface.findFinanceByMonthAndYear(
      parsedMonth,
      parsedYear,
    );
  }

  @Get('all-time-profit-and-expense')
  findProfitAndExpense() {
    return this.financeInterface.findAllTimeProfitAndLoss();
  }

  @Get('profit-and-expense-by-month-and-year')
  @ApiQuery({
    name: 'month',
    required: true,
  })
  @ApiQuery({
    name: 'year',
    required: true,
  })
  findProfitAndExpenseByMonthAndYear(
    @Query('month') month: string,
    @Query('year') year: string,
  ) {
    const parsedMonth = parseInt(month, 10);
    const parsedYear = parseInt(year, 10);
    return this.financeInterface.findProfitAndLossForMonthAndYear(
      parsedMonth,
      parsedYear,
    );
  }
}
