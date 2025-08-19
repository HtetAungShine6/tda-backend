import { CreateFinanceDto } from "../dtos/create-finance.dto";
import { ProfitLossResponse } from "../dtos/profit-loss.response";
import { UpdateFinanceDto } from "../dtos/update-finance.dto";
import { Finance } from "../finance.schema";

export interface FinanceInterface {
    createFinance(createFinanceDto: CreateFinanceDto): Promise<Finance>;
    findFinanceById(id: string): Promise<Finance>;
    findFinanceByMonthAndYear(month: number, year: number): Promise<Finance | null>;
    findAllFinances(): Promise<Finance[]>;
    updateFinance(id: string, updateFinanceDto: UpdateFinanceDto): Promise<Finance>;
    findAllTimeProfitAndLoss(): Promise<ProfitLossResponse>;
    findProfitAndLossForMonthAndYear(month: number, year: number): Promise<ProfitLossResponse>;
    deleteFinance(id: string): Promise<Finance>;
}