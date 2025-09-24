import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { UpdateEmployeeDto } from './dtos/update-employee.dto';
import { EmployeeInterface } from './interface/employee.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './employee.schema';
import { Model } from 'mongoose';
import { UpdateEmployeeStatusDto } from './dtos/update-employee-status.dto';
import { throwIfNotFound } from 'src/helpers/throwIfNotFound';
import { EmployeeRepo } from './repo/employee.repo';

@Injectable()
export class EmployeeServiceImpl implements EmployeeInterface {
  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<Employee>,

    private readonly employeeRepo: EmployeeRepo
  ) {}

  async createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    return this.employeeRepo.createEmployee(createEmployeeDto);
  }

  // async findEmployeeById(id: string): Promise<Employee> {
  //   const employee = await this.employeeModel.findById(id).exec();
  //   return throwIfNotFound(employee, id, 'Employee') as Employee;
  // }

  async findEmployeeById(id: string): Promise<Employee> {
      const employee = await this.employeeRepo.findEmployeeById(id);
      return throwIfNotFound(employee, id, 'Employee') as Employee;
  }

  // async findAllEmployees(): Promise<Employee[]> {
  //   return this.employeeModel.find().exec();
  // }

  async findAllEmployees(empName?: string, page = 1, limit = 10): Promise<{ data: Employee[]; total: number; page: number; limit: number, totalPages: number }> {
  const skip = (page - 1) * limit;
  const filter: any = {};

  if (empName) {
    filter.name = { $regex: empName, $options: 'i' }; 
  }

  const [data, total] = await Promise.all([
    this.employeeModel.find(filter).skip(skip).limit(limit).exec(),
    this.employeeModel.countDocuments(filter).exec(),
  ]);

  const totalPages = Math.ceil(total / limit);

  return { data, total, page, limit, totalPages };
}

  async updateEmployee(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    const employeeToUpdate = await this.employeeModel.findByIdAndUpdate(id, updateEmployeeDto, {
      new: true,
      runValidators: true,
    }).exec();
    return throwIfNotFound(employeeToUpdate, id, 'Employee') as Employee;
  }

  async deleteEmployee(id: string): Promise<Employee> {
    const employeeToDelete = await this.employeeModel.findByIdAndDelete(id).exec();
    return throwIfNotFound(employeeToDelete, id, 'Employee') as Employee;
  }

  async updateEmployeeStatus(id: string, status: UpdateEmployeeStatusDto): Promise<Employee> {
    const employeeStatusToUpdate = await this.employeeModel.findByIdAndUpdate(id, status, { new: true }).exec();
    return throwIfNotFound(employeeStatusToUpdate, id, 'Employee') as Employee;
  }
}
