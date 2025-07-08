import { Types } from "mongoose";
import { CreatePayrollDto } from "../dtos/create-payroll.dto";
import { UpdatePayrollDto } from "../dtos/update-payroll.dto";
import { Payroll } from "../employee.payroll.schema";

export interface PayrollInterface {
    // createPayroll(employeeId: string, quantity: number, totalPrice: number): Promise<Payroll>;
    createPayroll(createPayrollDto: CreatePayrollDto): Promise<Payroll>;
    findPayrollByMonthYearAndEmployeeId(month: number, year: number, employeeId: string): Promise<Payroll>;
    findPayrollByMonthAndYear(month: number, year: number): Promise<Payroll[]>;
    findPayrollByEmployeeId(employeeId: string): Promise<Payroll[]>;
    findAllPayrolls(): Promise<Payroll[]>;
    updatePayroll(id: string, updatePayrollDto: UpdatePayrollDto): Promise<Payroll>;
}