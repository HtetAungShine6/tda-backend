import { CreateEmployeeProductDto } from "../dtos/create-employee-product.dto";
import { UpdateEmployeeProductDto } from "../dtos/update-employee-product.dto";
import { EmployeeProduct } from "../employee-product.schema";

export interface EmployeeProductInterface {
    createEmployeeProduct(createEmployeeProductDto: CreateEmployeeProductDto): Promise<EmployeeProduct>;
    findEmployeeProductById(id: string): Promise<EmployeeProduct | null>;
    findAllEmployeeProducts(): Promise<EmployeeProduct[]>;
    updateEmployeeProduct(id: string, updateEmployeeProductDto: UpdateEmployeeProductDto): Promise<EmployeeProduct | null>;
    deleteEmployeeProduct(id: string): Promise<EmployeeProduct | null>;
}