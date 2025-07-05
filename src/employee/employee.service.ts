import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { UpdateEmployeeDto } from './dtos/update-employee.dto';
import { EmployeeInterface } from './interface/employee.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './employee.schema';
import { Model } from 'mongoose';
import { UpdateEmployeeStatusDto } from './dtos/update-employee-status.dto';
import { throwIfNotFound } from 'src/helpers/throwIfNotFound';

@Injectable()
export class EmployeeServiceImpl implements EmployeeInterface {
  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<Employee>,
  ) {}

  async createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    return this.employeeModel.create(createEmployeeDto);
  }

  async findEmployeeById(id: string): Promise<Employee> {
    const employee = await this.employeeModel.findById(id).exec();
    return throwIfNotFound(employee, id, 'Employee') as Employee;
  }

  async findAllEmployees(): Promise<Employee[]> {
    return this.employeeModel.find().exec();
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
