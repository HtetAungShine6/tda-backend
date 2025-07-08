import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ExpenseInterface } from './interface/expense.interface';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateExpenseDto } from './dtos/create-expense.dto';
import { create } from 'domain';
import { UpdateExpenseDto } from './dtos/update-expense.dto';

@Controller('expense')
export class ExpenseController {
    constructor(
        @Inject('ExpenseInterface')
        private readonly expenseInterface: ExpenseInterface
    ){}

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
    @ApiOperation({ summary: 'Find all expenses' })
    findAllExpenses() {
        return this.expenseInterface.findAllExpenses();
    }

    @Patch('/:id')
    @Auth(AuthType.Bearer)
    @ApiBearerAuth('bearer-token')
    @ApiOperation({ summary: 'Update an expense by ID' })
    updateExpense(
        @Param('id') id: string,
        @Body() updateExpenseDto: UpdateExpenseDto
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
