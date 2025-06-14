import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { UpdateEmployeeDto } from './dtos/update-employee.dto';
import { EmployeeInterface } from './interface/employee.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './employee.schema';
import { Model } from 'mongoose';

@Injectable()
export class EmployeeServiceImpl implements EmployeeInterface {
  
  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<Employee>,
  ) {}
  async createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const createdEmployee = new this.employeeModel(createEmployeeDto);
    return createdEmployee.save();
  }

  async findEmployeeById(id: string): Promise<Employee | null> {
    return this.employeeModel.findById(id).exec();
  }
  async findAllEmployees(): Promise<Employee[]> {
    return this.employeeModel.find().exec();
  }
  async updateEmployee(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee | null> {
    return this.employeeModel.findByIdAndUpdate(id, updateEmployeeDto, { new: true }).exec();
  }
  deleteEmployee(id: string): Promise<Employee | null> {
    return this.employeeModel.findByIdAndDelete(id).exec();
  }
}
