import { Types } from "mongoose";
import { CreatePayrollDto } from "../dtos/create-payroll.dto";
import { UpdatePayrollDto } from "../dtos/update-payroll.dto";
import { Payroll } from "../employee.payroll.schema";

export interface PayrollInterface {
    // createPayroll(employeeId: string, quantity: number, totalPrice: number): Promise<Payroll>;
    createPayroll(createPayrollDto: CreatePayrollDto): Promise<Payroll>;
    findPayrollByMonthYearAndEmployeeId(month: number, year: number, employeeId: string): Promise<Payroll | null>;
    findPayrollByMonthAndYear(month: number, year: number, page?: number, limit?: number, ): Promise<{data: Payroll[], total: number, page: number, limit: number, totalPages: number}>;
    findPayrollByEmployeeId(employeeId: string): Promise<Payroll[]>;
    // findAllPayrolls(): Promise<Payroll[]>;
    findAllPayrolls(page?: number, limit?: number): Promise<{ data: Payroll[]; total: number; page: number; limit: number, totalPages: number }>;
    updatePayroll(id: string, updatePayrollDto: UpdatePayrollDto): Promise<Payroll>;
}