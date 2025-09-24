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
import { IncomeInterface } from './interface/income.interface';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateIncomeDto } from './dtos/create-income.dto';
import { UpdateIncomeDto } from './dtos/update-income.dto';

@Controller('income')
export class IncomeController {
  constructor(
    @Inject('IncomeInterface')
    private readonly incomeInterface: IncomeInterface,
  ) {}

  @Post()
  @Auth(AuthType.Bearer)
  @ApiBearerAuth('bearer-token')
  @ApiOperation({ summary: 'Create a new income' })
  @ApiBody({ type: CreateIncomeDto })
  createIncome(@Body() createIncomeDto: CreateIncomeDto) {
    return this.incomeInterface.createIncome(createIncomeDto);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Find an income by ID' })
  findIncomeById(@Param('id') id: string) {
    return this.incomeInterface.findIncomeById(id);
  }

  @Get()
  @ApiQuery({
    name: 'month',
    required: false,
    description: '1 = Jan, 12 = Dec',
  })
  @ApiQuery({ name: 'year', required: false, description: 'eg: 2025' })
  @ApiOperation({ summary: 'Find all incomes' })
  findAllIncomes(@Query('month') month: string, @Query('year') year: string) {
    if (!month && !year) {
      return this.incomeInterface.findAllIncomes();
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

    return this.incomeInterface.findIncomeWithMonthAndYear(
      parsedMonth,
      parsedYear,
    );
  }

  @Patch('/:id')
  @Auth(AuthType.Bearer)
  @ApiBearerAuth('bearer-token')
  @ApiOperation({ summary: 'Update an income by ID' })
  updateIncome(
    @Param('id') id: string,
    @Body() updateIncomeDto: UpdateIncomeDto,
  ) {
    return this.incomeInterface.updateIncome(id, updateIncomeDto);
  }

  @Delete('/:id')
  @Auth(AuthType.Bearer)
  @ApiBearerAuth('bearer-token')
  @ApiOperation({ summary: 'Delete an income by ID' })
  deleteIncome(@Param('id') id: string) {
    return this.incomeInterface.deleteIncome(id);
  }
}
