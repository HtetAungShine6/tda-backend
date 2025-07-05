import { BadRequestException, Controller, Get, Inject, Query } from '@nestjs/common';
import { PayrollInterface } from './interface/payroll.interface';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('payroll')
export class PayrollController {
  constructor(
    @Inject('PayrollInterface')
    private readonly payrollInterface: PayrollInterface,
  ) {}

  @Get()
  async findAllPayrolls() {
    return this.payrollInterface.findAllPayrolls();
  }

  @Get('by-date')
  @ApiQuery({ name: 'employeeId', required: true })
  @ApiQuery({ name: 'month', required: true, description: '1 = Jan, 12 = Dec' })
  @ApiQuery({ name: 'year', required: true, description: 'e.g. 2025' })
  async findByMonthYearAndEmployeeId(
    @Query('employeeId') employeeId: string,
    @Query('month') month: string,
    @Query('year') year: string,
  ) {
    if (!employeeId || !month || !year) {
      throw new BadRequestException('employeeId, month, and year are all required.');
    }

    const parsedMonth = parseInt(month, 10);
    const parsedYear = parseInt(year, 10);

    if (isNaN(parsedMonth) || parsedMonth < 1 || parsedMonth > 12) {
      throw new BadRequestException('Invalid "month". Must be between 1 and 12.');
    }

    if (isNaN(parsedYear) || parsedYear < 1900) {
      throw new BadRequestException('Invalid "year".');
    }

    return this.payrollInterface.findPayrollByMonthYearAndEmployeeId(
      parsedMonth,
      parsedYear,
      employeeId,
    );
  }
}
