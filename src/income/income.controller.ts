import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { IncomeInterface } from './interface/income.interface';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateIncomeDto } from './dtos/create-income.dto';
import { UpdateIncomeDto } from './dtos/update-income.dto';

@Controller('income')
export class IncomeController {
    constructor(
        @Inject('IncomeInterface')
        private readonly incomeInterface: IncomeInterface
    ){}

    @Post()
    @Auth(AuthType.Bearer)
    @ApiBearerAuth('bearer-token')
    @ApiOperation({ summary: 'Create a new income' })
    @ApiBody({ type: CreateIncomeDto})
    createIncome(@Body() createIncomeDto: CreateIncomeDto) {
        return this.incomeInterface.createIncome(createIncomeDto);
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Find an income by ID' })
    findIncomeById(@Param('id') id: string) {
        return this.incomeInterface.findIncomeById(id);
    }

    @Get()
    @ApiOperation({ summary: 'Find all incomes' })
    findAllIncomes() {
        return this.incomeInterface.findAllIncomes();
    }

    @Patch('/:id')
    @Auth(AuthType.Bearer)
    @ApiBearerAuth('bearer-token')
    @ApiOperation({ summary: 'Update an income by ID' })
    updateIncome(
        @Param('id') id: string,
        @Body() updateIncomeDto: UpdateIncomeDto
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
