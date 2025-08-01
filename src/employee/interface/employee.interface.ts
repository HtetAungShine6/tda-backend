import { CreateEmployeeDto } from '../dtos/create-employee.dto';
import { UpdateEmployeeStatusDto } from '../dtos/update-employee-status.dto';
import { UpdateEmployeeDto } from '../dtos/update-employee.dto';
import { Employee } from '../employee.schema';

export interface EmployeeInterface {
  createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee>;
  findEmployeeById(id: string): Promise<Employee>;
  findAllEmployees(): Promise<Employee[]>;
  updateEmployee(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee>;
  deleteEmployee(id: string): Promise<Employee>;
  updateEmployeeStatus(id: string, status: UpdateEmployeeStatusDto): Promise<Employee>;
}