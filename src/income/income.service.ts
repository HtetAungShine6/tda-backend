import { Inject, Injectable } from '@nestjs/common';
import { IncomeInterface } from './interface/income.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Income } from './income.schema';
import { Model, Types } from 'mongoose';
import { throwIfNotFound } from 'src/helpers/throwIfNotFound';
import { CreateIncomeDto } from './dtos/create-income.dto';
import { UpdateIncomeDto } from './dtos/update-income.dto';
import { FinanceInterface } from 'src/finance/interface/finance.interface';
import { create } from 'domain';

@Injectable()
export class IncomeServiceImpl implements IncomeInterface {
  constructor(
    @InjectModel(Income.name)
    private readonly incomeModel: Model<Income>,

    @Inject('FinanceInterface')
    private readonly financeInterface: FinanceInterface,
  ) {}

  async createIncome(createIncomeDto: CreateIncomeDto): Promise<Income> {
    const date = new Date(createIncomeDto.date);
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();
    const incomeAmount = createIncomeDto.amount;
    const existingFinance = await this.financeInterface.findFinanceByMonthAndYear(currentMonth, currentYear);
    if (!existingFinance) {
      await this.financeInterface.createFinance({
        totalIncome: incomeAmount,
      });
    } else {
      existingFinance.totalIncome += incomeAmount;
      const financeId = (existingFinance._id as Types.ObjectId).toString();
      await this.financeInterface.updateFinance(financeId, existingFinance);
    }
    return this.incomeModel.create(createIncomeDto);
  }

  async findIncomeById(id: string): Promise<Income> {
    const income = await this.incomeModel.findById(id).exec();
    return throwIfNotFound(income, id, 'Income') as Income;
  }

  async findAllIncomes(): Promise<Income[]> {
    return this.incomeModel.find().exec();
  }

  async updateIncome(id: string, updateIncomeDto: UpdateIncomeDto): Promise<Income> {
    const existingIncome = await this.findIncomeById(id);
    const oldAmount = existingIncome.amount;
    const updatedDate = new Date(updateIncomeDto.date ?? existingIncome.date);
    const updatedAmount = updateIncomeDto.amount ?? oldAmount;
    const originalDate = new Date(existingIncome.date);
    const originalMonth = originalDate.getMonth() + 1;
    const originalYear = originalDate.getFullYear();

    const incomeToUpdate = await this.incomeModel.findByIdAndUpdate(id, updateIncomeDto, {
        new: true,
        runValidators: true,
    })
    .exec();

    const oldFinance = await this.financeInterface.findFinanceByMonthAndYear(originalMonth, originalYear);
    const newTotalIncome = oldFinance.totalIncome - oldAmount + updatedAmount;
    const financeId = (oldFinance._id as Types.ObjectId).toString();
    await this.financeInterface.updateFinance(financeId, {
        totalIncome: newTotalIncome
    })

    return throwIfNotFound(incomeToUpdate, id, 'Income') as Income;
  }

  async deleteIncome(id: string): Promise<Income> {
    const existingIncome = await this.findIncomeById(id)
    const oldAmount = existingIncome.amount;
    const originalMonth = existingIncome.date.getMonth() + 1;
    const originalYear = existingIncome.date.getFullYear();

    const incomeToDelete = await this.incomeModel.findByIdAndDelete(id).exec();

    const finance = await this.financeInterface.findFinanceByMonthAndYear(originalMonth, originalYear)
    const newTotalIncome = finance.totalIncome - oldAmount
    const financeId = (finance._id as Types.ObjectId).toString();
    await this.financeInterface.updateFinance(financeId, {
        totalIncome: newTotalIncome
    })
    return throwIfNotFound(incomeToDelete, id, 'Income') as Income;
  }
}
