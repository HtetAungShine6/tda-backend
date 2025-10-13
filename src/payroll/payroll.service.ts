import { Inject, Injectable } from '@nestjs/common';
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

  async findPayrollByMonthYearAndEmployeeId(
    month: number,
    year: number,
    employeeId: string,
  ): Promise<Payroll | null> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);
    return await this.payrollModel
      .findOne({
        employeeId,
        period: { $gte: startDate, $lt: endDate },
      })
      .exec();
  }

  async findPayrollByMonthAndYear(
    month: number,
    year: number,
    page = 1,
    limit = 10,
  ): Promise<{
    data: Payroll[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);
    const skip = (page - 1) * limit;

    const payroll = await this.payrollModel
      .find({
        period: { $gte: startDate, $lt: endDate },
      })
      .skip(skip)
      .limit(limit)
      .exec();

    const [data, total] = await Promise.all([
      payroll,
      this.payrollModel.countDocuments().exec(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return { data, total, page, limit, totalPages };
  }

  // async findAllPayrolls(): Promise<Payroll[]> {
  //   return this.payrollModel.find().exec();
  // }

  async findAllPayrolls(
    page = 1,
    limit = 10,
  ): Promise<{
    data: Payroll[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.payrollModel.find().skip(skip).limit(limit).exec(),
      this.payrollModel.countDocuments().exec(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return { data, total, page, limit, totalPages };
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

  async getTotalPayrollAmount(month: number, year: number): Promise<number> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    const result = await this.payrollModel
      .aggregate([
        {
          $match: {
            period: { $gte: startDate, $lt: endDate },
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: '$totalSalary' },
          },
        },
      ])
      .exec();

    return result.length > 0 ? result[0].totalAmount : 0;
  }
}

//   async findPayrollByEmployeeId(employeeId: string): Promise<Payroll[]> {
//     const empObjectId = toObjectId(employeeId);
//     return this.payrollModel.find({ employeeId: empObjectId }).exec();
//   }
