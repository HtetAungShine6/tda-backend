import { CreateEmployeeDto } from "../dto/create-employee.dto";
import { UpdateEmployeeDto } from "../dto/update-employee.dto";
import { Employee } from "../employee.schema";

export interface EmployeeInterface {
    createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee>;
    findEmployeeById(id: string): Promise<Employee | null>;
    findAllEmployees(): Promise<Employee[]>;
    updateEmployee(id: string, updateEmployeeDto: Partial<UpdateEmployeeDto>): Promise<Employee | null>;
    deleteEmployee(id: string): Promise<Employee | null>;
}