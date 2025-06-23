import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { UpdateEmployeeDto } from './dtos/update-employee.dto';
import { EmployeeInterface } from './interface/employee.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './employee.schema';
import { Model } from 'mongoose';
import { EmpStatus } from './enums/emp-status.enum';
import { UpdateEmployeeStatusDto } from './dtos/update-employee-status.dto';

@Injectable()
export class EmployeeServiceImpl implements EmployeeInterface {
  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<Employee>,
  ) {}

  async createEmployee(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    try {
      const createdEmployee = new this.employeeModel(createEmployeeDto);
      return createdEmployee.save();
    } catch (error) {
      throw new Error('Failed to create employee: ' + error.message);
    }
  }

  async findEmployeeById(id: string): Promise<Employee | null> {
    try {
      const employee = await this.employeeModel.findById(id).exec();
      if (!employee) {
        throw new NotFoundException('Employee not found');
      }
      return employee;
    } catch (error) {
      throw new Error('Failed to find employee by ID: ' + error.message);
    }
  }

  async findAllEmployees(): Promise<Employee[]> {
    try {
      const employees = await this.employeeModel.find().exec();
      if (!employees || employees.length === 0) {
        throw new NotFoundException('No employees found');
      }
      return employees;
    } catch (error) {
      throw new Error('Failed to find all employees: ' + error.message);
    }
  }

  async updateEmployee(
    id: string,
    updateDto: UpdateEmployeeDto,
  ): Promise<Employee | null> {
    try {
      const updatedEmployee = await this.employeeModel
        .findByIdAndUpdate(id, updateDto, {
          new: true,
          runValidators: true,
        })
        .exec();
      if (!updatedEmployee) {
        throw new NotFoundException('Employee not found');
      }
      return updatedEmployee;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to update employee: ' + error.message,
      );
    }
  }

  async deleteEmployee(id: string): Promise<Employee | null> {
    try {
      const employeeToDelete = await this.employeeModel
        .findByIdAndDelete(id)
        .exec();
      if (!employeeToDelete) {
        throw new NotFoundException('Employee not found');
      }
      return employeeToDelete;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to delete employee: ' + error.message,
      );
    }
  }

  async updateEmployeeStatus(
    id: string,
    status: UpdateEmployeeStatusDto,
  ): Promise<Employee | null> {
    try {
      const employeeStatus = await this.employeeModel
        .findByIdAndUpdate(id, status, { new: true })
        .exec();
      if (!employeeStatus) {
        throw new NotFoundException('Employee not found');
      }
      return employeeStatus;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to update employee status: ' + error.message,
      );
    }
  }
}
