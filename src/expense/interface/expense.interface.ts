import { CreateExpenseDto } from "../dtos/create-expense.dto";
import { UpdateExpenseDto } from "../dtos/update-expense.dto";
import { Expense } from "../expense.schema";

export interface ExpenseInterface {
    createExpense(createExpenseDto: CreateExpenseDto): Promise<Expense>;
    findExpenseById(id: string): Promise<Expense>;
    findAllExpenses(): Promise<Expense[]>;
    findExpensesWithMonthAndYear(month: number, year: number): Promise<Expense[]>;
    updateExpense(id: string, updateExpenseDto: UpdateExpenseDto): Promise<Expense>;
    deleteExpense(id: string): Promise<Expense>;
}