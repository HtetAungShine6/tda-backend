import { CreateEmployeeProductDto } from "../dtos/create-employee-product.dto";
import { UpdateEmployeeProductDto } from "../dtos/update-employee-product.dto";
import { EmployeeProduct } from "../employee-product.schema";

export interface EmployeeProductInterface {
    createEmployeeProduct(createEmployeeProductDto: CreateEmployeeProductDto): Promise<EmployeeProduct>;
    findEmployeeProductById(id: string): Promise<EmployeeProduct>;
    // findAllEmployeeProducts(): Promise<EmployeeProduct[]>;
    findAllEmployeeProducts(page?: number, limit?: number): Promise<{ data: EmployeeProduct[]; total: number; page: number; limit: number, totalPages: number }>;
    findEmployeeProductsByEmployeeId(employeeId: string): Promise<EmployeeProduct[]>;
    findEmployeeProductsByProductId(productId: string): Promise<EmployeeProduct[]>;
    updateEmployeeProduct(id: string, updateEmployeeProductDto: UpdateEmployeeProductDto): Promise<EmployeeProduct>;
    deleteEmployeeProduct(id: string): Promise<EmployeeProduct>;
}