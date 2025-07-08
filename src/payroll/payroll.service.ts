import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { PayrollInterface } from './interface/payroll.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Payroll } from './employee.payroll.schema';
import { Model, Types } from 'mongoose';
import { EmployeeInterface } from 'src/employee/interface/employee.interface';
import { CreatePayrollDto } from './dtos/create-payroll.dto';
import { throwIfNotFound } from 'src/helpers/throwIfNotFound';
import { UpdatePayrollDto } from './dtos/update-payroll.dto';
import { PayrollDocument } from './payroll.document';

@Injectable()
export class PayrollServiceImpl implements PayrollInterface {
  constructor(
    @InjectModel(Payroll.name)
    private readonly payrollModel: Model<PayrollDocument>,

    @Inject('EmployeeInterface')
    private readonly employeeInterface: EmployeeInterface,
  ) {}

  async createPayroll(createPayrollDto: CreatePayrollDto): Promise<Payroll> {
    return this.payrollModel.create(createPayrollDto);
  }

  async findPayrollByEmployeeId(employeeId: string): Promise<Payroll[]> {
    const payrolls = await this.payrollModel
      .find({ employeeId: employeeId })
      .exec();
    return throwIfNotFound(payrolls, employeeId, 'Payrolls');
  }

  async findPayrollByMonthYearAndEmployeeId(month: number, year: number, employeeId: string): Promise<Payroll> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);
    const payroll = await this.payrollModel
      .findOne({
        employeeId,
        period: { $gte: startDate, $lt: endDate },
      })
      .exec();
    return throwIfNotFound(payroll, employeeId, 'Date of Payroll') as Payroll;
  }

  async findPayrollByMonthAndYear(month: number, year: number): Promise<Payroll[]> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);
    const payroll = await this.payrollModel
      .find({
        period: { $gte: startDate, $lt: endDate },
      })
      .exec();
    return throwIfNotFound(payroll, `${month}-${year}`, 'Payrolls') as Payroll[];
  }

  async findAllPayrolls(): Promise<Payroll[]> {
    return this.payrollModel.find().exec();
  }

  async updatePayroll(
    id: string,
    updatePayrollDto: UpdatePayrollDto,
  ): Promise<Payroll> {
    const payrollToUpdate = await this.payrollModel
      .findByIdAndUpdate(id, updatePayrollDto, {
        new: true,
        runValidators: true,
      })
      .exec();
    return throwIfNotFound(payrollToUpdate, id, 'Payroll') as Payroll;
  }
}

//   async findPayrollByEmployeeId(employeeId: string): Promise<Payroll[]> {
//     const empObjectId = toObjectId(employeeId);
//     return this.payrollModel.find({ employeeId: empObjectId }).exec();
//   }
