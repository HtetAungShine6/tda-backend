import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Employee } from "../employee.schema";
import { Model } from "mongoose";
import { CreateEmployeeDto } from "../dtos/create-employee.dto";

@Injectable()
export class EmployeeRepo {
    constructor(
        @InjectModel(Employee.name)
        private readonly employeeModel: Model<Employee>,
    ){}

    createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
        return this.employeeModel.create(createEmployeeDto);
    }

    findEmployeeById(id: string): Promise<Employee | null> {
        return this.employeeModel.findById(id).exec();
    }
}