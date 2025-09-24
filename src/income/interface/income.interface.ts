import { CreateIncomeDto } from "../dtos/create-income.dto";
import { UpdateIncomeDto } from "../dtos/update-income.dto";
import { Income } from "../income.schema";

export interface IncomeInterface {
    createIncome(createIncomeDto: CreateIncomeDto): Promise<Income>;
    findIncomeById(id: string): Promise<Income>;
    findAllIncomes(): Promise<Income[]>;
    findIncomeWithMonthAndYear(month: number, year: number): Promise<Income[]>;
    updateIncome(id: string, updateIncomeDto: UpdateIncomeDto): Promise<Income>;
    deleteIncome(id: string): Promise<Income>;
}