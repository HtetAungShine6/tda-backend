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
  @ApiQuery({ name: 'employeeId', required: false })
  @ApiQuery({ name: 'month', required: false, description: '1 = Jan, 12 = Dec' })
  @ApiQuery({ name: 'year', required: false, description: 'e.g. 2025' })
  async findByMonthYearAndEmployeeId(
    @Query('employeeId') employeeId: string,
    @Query('month') month: string,
    @Query('year') year: string,
  ) {

    if (!employeeId && !month && !year) {
      return this.payrollInterface.findAllPayrolls();
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

  @Get('/by-employee-id')
  @ApiOperation({ summary: 'Find payrolls by employee ID' })
  @ApiQuery({ name: 'employeeId', required: true, description: 'MongoDB _id of the employee' })
  async findPayrollByEmployeeId(@Query('employeeId') employeeId: string) {
    return this.payrollInterface.findPayrollByEmployeeId(employeeId);
  }
}
