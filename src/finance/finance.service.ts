import { Injectable } from '@nestjs/common';
import { FinanceInterface } from './interface/finance.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Finance } from './finance.schema';
import { Model } from 'mongoose';
import { throwIfNotFound } from 'src/helpers/throwIfNotFound';
import { CreateFinanceDto } from './dtos/create-finance.dto';
import { UpdateFinanceDto } from './dtos/update-finance.dto';
import { ProfitLossResponse } from './dtos/profit-loss.response';

@Injectable()
export class FinanceServiceImpl implements FinanceInterface {
  constructor(
    @InjectModel(Finance.name)
    private readonly financeModel: Model<Finance>,
  ) {}

  async createFinance(createFinanceDto: CreateFinanceDto): Promise<Finance> {
    return this.financeModel.create(createFinanceDto);
  }

  async findFinanceById(id: string): Promise<Finance> {
    const finance = await this.financeModel.findById(id).exec();
    return throwIfNotFound(finance, id, 'Finance') as Finance;
  }

  async findFinanceByMonthAndYear(
    month: number,
    year: number,
  ): Promise<Finance> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);
    const finance = await this.financeModel
      .findOne({
        date: { $gte: startDate, $lt: endDate },
      })
      .exec();
    return throwIfNotFound(finance, `${month}-${year}`, 'Finance') as Finance;
  }

  async findAllFinances(): Promise<Finance[]> {
    return this.financeModel.find().exec();
  }

  async updateFinance(
    id: string,
    updateFinanceDto: UpdateFinanceDto,
  ): Promise<Finance> {
    const financeToUpdate = await this.financeModel
      .findByIdAndUpdate(id, updateFinanceDto, {
        new: true,
        runValidators: true,
      })
      .exec();
    return throwIfNotFound(financeToUpdate, id, 'Finance') as Finance;
  }

  async findAllTimeProfitAndLoss(): Promise<ProfitLossResponse> {
    const finances = await this.financeModel.find().exec();
    let totalIncome = 0;
    let totalExpense = 0;
    for (const record of finances) {
      totalIncome += record.totalIncome;
      totalExpense += record.totalExpense;
    }

    const profit = Math.max(totalIncome - totalExpense, 0);
    const loss = Math.max(totalExpense - totalIncome, 0);

    return { profit, loss };
  }

  async findProfitAndLossForMonthAndYear(
    month: number,
    year: number,
  ): Promise<ProfitLossResponse> {
    const finance = await this.findFinanceByMonthAndYear(month, year);
    return this.calculateProfitAndLoss(finance)
  }

  async deleteFinance(id: string): Promise<Finance> {
    const financeToDelete = await this.financeModel
      .findByIdAndDelete(id)
      .exec();
    return throwIfNotFound(financeToDelete, id, 'Finance') as Finance;
  }

  private calculateProfitAndLoss(finance: {
    totalIncome: number;
    totalExpense: number;
  }): ProfitLossResponse {
    const { totalIncome, totalExpense } = finance;
    if (totalIncome > totalExpense) {
      return { profit: totalIncome - totalExpense, loss: 0 };
    } else if (totalExpense > totalIncome) {
      return { profit: 0, loss: totalExpense - totalIncome };
    } else {
      return { profit: 0, loss: 0 };
    }
  }
}
