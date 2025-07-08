import { Inject, Injectable } from '@nestjs/common';
import { ExpenseInterface } from './interface/expense.interface';
import { Expense } from './expense.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { throwIfNotFound } from 'src/helpers/throwIfNotFound';
import { UpdateExpenseDto } from './dtos/update-expense.dto';
import { FinanceInterface } from 'src/finance/interface/finance.interface';
import { CreateExpenseDto } from './dtos/create-expense.dto';

@Injectable()
export class ExpenseServiceImpl implements ExpenseInterface {
  constructor(
    @InjectModel(Expense.name)
    private readonly expenseModel: Model<Expense>,

    @Inject('FinanceInterface')
    private readonly financeInterface: FinanceInterface,
  ) {}

  async createExpense(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    const date = new Date(createExpenseDto.date);
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();
    const expenseAmount = createExpenseDto.amount;
    const existingFinance =
      await this.financeInterface.findFinanceByMonthAndYear(
        currentMonth,
        currentYear,
      );
    if (!existingFinance) {
      await this.financeInterface.createFinance({
        totalExpense: expenseAmount,
      });
    } else {
      existingFinance.totalExpense += expenseAmount;
      const financeId = (existingFinance._id as Types.ObjectId).toString();
      await this.financeInterface.updateFinance(financeId, existingFinance);
    }
    return this.expenseModel.create(createExpenseDto);
  }

  async findExpenseById(id: string): Promise<Expense> {
    const expense = await this.expenseModel.findById(id).exec();
    return throwIfNotFound(expense, id, 'Expense') as Expense;
  }

  async findAllExpenses(): Promise<Expense[]> {
    return this.expenseModel.find().exec();
  }

  async updateExpense(
    id: string,
    updateExpenseDto: UpdateExpenseDto,
  ): Promise<Expense> {
    const existingExpense = await this.findExpenseById(id);
    const oldAmount = existingExpense.amount;
    const updatedDate = new Date(updateExpenseDto.date ?? existingExpense.date);
    const updatedAmount = updateExpenseDto.amount ?? oldAmount;
    const originalDate = new Date(existingExpense.date);
    const originalMonth = originalDate.getMonth() + 1;
    const originalYear = originalDate.getFullYear();

    const expenseToUpdate = await this.expenseModel
      .findByIdAndUpdate(id, updateExpenseDto, {
        new: true,
        runValidators: true,
      })
      .exec();

    const oldFinance = await this.financeInterface.findFinanceByMonthAndYear(originalMonth, originalYear);
    const newTotalExpense = oldFinance.totalExpense - oldAmount + updatedAmount;
    const financeId = (oldFinance._id as Types.ObjectId).toString();
    await this.financeInterface.updateFinance(financeId, {
        totalExpense: newTotalExpense
    })

    return throwIfNotFound(expenseToUpdate, id, 'Expense') as Expense;
  }

  async deleteExpense(id: string): Promise<Expense> {
    const existingExpense = await this.findExpenseById(id)
    const oldAmount = existingExpense.amount;
    const originalMonth = existingExpense.date.getMonth() + 1;
    const originalYear = existingExpense.date.getFullYear();

    const expense = await this.expenseModel.findByIdAndDelete(id).exec();

    const finance = await this.financeInterface.findFinanceByMonthAndYear(originalMonth, originalYear)
    const newTotalExpense = finance.totalExpense - oldAmount
    const financeId = (finance._id as Types.ObjectId).toString();
    await this.financeInterface.updateFinance(financeId, {
        totalExpense: newTotalExpense
    })
    return throwIfNotFound(expense, id, 'Expense') as Expense;
  }
}
