import { CreateEmployeeDto } from "../dtos/create-employee.dto";
import { UpdateEmployeeStatusDto } from "../dtos/update-employee-status.dto";
import { UpdateEmployeeDto } from "../dtos/update-employee.dto";
import { Employee } from "../employee.schema";

export interface EmployeeInterface {
    createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee>;
    findEmployeeById(id: string): Promise<Employee | null>;
    findAllEmployees(): Promise<Employee[]>;
    updateEmployee(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee | null>;
    deleteEmployee(id: string): Promise<Employee | null>;
    updateEmployeeStatus(id: string, status: UpdateEmployeeStatusDto): Promise<Employee | null>;
}