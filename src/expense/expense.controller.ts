import {
    BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ExpenseInterface } from './interface/expense.interface';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateExpenseDto } from './dtos/create-expense.dto';
import { create } from 'domain';
import { UpdateExpenseDto } from './dtos/update-expense.dto';

@Controller('expense')
export class ExpenseController {
  constructor(
    @Inject('ExpenseInterface')
    private readonly expenseInterface: ExpenseInterface,
  ) {}

  @Post()
  @Auth(AuthType.Bearer)
  @ApiBearerAuth('bearer-token')
  @ApiOperation({ summary: 'Create a new expense' })
  @ApiBody({ type: CreateExpenseDto })
  createExpense(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseInterface.createExpense(createExpenseDto);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Find an expense by ID' })
  findExpenseById(@Param('id') id: string) {
    return this.expenseInterface.findExpenseById(id);
  }

  @Get()
  @ApiQuery({
    name: 'month',
    required: false,
    description: '1 = Jan, 12 = Dec',
  })
  @ApiQuery({ name: 'year', required: false, description: 'eg: 2025' })
  @ApiOperation({ summary: 'Find all expenses' })
  findAllExpenses(@Query('month') month: string, @Query('year') year: string) {
    if (!month && !year) {
      return this.expenseInterface.findAllExpenses();
    }

    const parsedMonth = parseInt(month, 10);
    const parsedYear = parseInt(year, 10);
    if (isNaN(parsedMonth) || parsedMonth < 1 || parsedMonth > 12) {
      throw new BadRequestException(
        'Invalid "month". Must be between 1 and 12.',
      );
    }

    if (isNaN(parsedYear) || parsedYear < 1900) {
      throw new BadRequestException('Invalid "year".');
    }

    return this.expenseInterface.findExpensesWithMonthAndYear(parsedMonth, parsedYear);
  }

  @Patch('/:id')
  @Auth(AuthType.Bearer)
  @ApiBearerAuth('bearer-token')
  @ApiOperation({ summary: 'Update an expense by ID' })
  updateExpense(
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expenseInterface.updateExpense(id, updateExpenseDto);
  }

  @Delete('/:id')
  @Auth(AuthType.Bearer)
  @ApiBearerAuth('bearer-token')
  @ApiOperation({ summary: 'Delete an expense by ID' })
  deleteExpense(@Param('id') id: string) {
    return this.expenseInterface.deleteExpense(id);
  }
}
