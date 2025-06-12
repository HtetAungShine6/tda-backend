import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeInterface } from './interface/employee.interface';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Employee')  
@Controller('employee')
export class EmployeeController {
  constructor(
    @Inject('EmployeeInterface')
    private readonly employeeInterface: EmployeeInterface
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new employee' })
  @ApiBody({ type: CreateEmployeeDto })
  @ApiResponse({ status: 201, description: 'Employee created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async createEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
    return await this.employeeInterface.createEmployee(createEmployeeDto);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Find an employee by ID' })
  @ApiResponse({ status: 200, description: 'Employee found successfully' })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  async findEmployeeById(@Param('id') id: string) {
    const employee = await this.employeeInterface.findEmployeeById(id);
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
    return employee;
  }

  @Get()
  @ApiOperation({ summary: 'Find all employees' })
  @ApiResponse({ status: 200, description: 'Employees found successfully' })
  async findAllEmployees() {  
    const employees = await this.employeeInterface.findAllEmployees();
    if (!employees || employees.length === 0) {
      throw new NotFoundException('No employees found');
    }
    return employees;
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update an employee by ID' })
  @ApiBody({ type: UpdateEmployeeDto })
  @ApiResponse({ status: 200, description: 'Employee updated successfully' })
  @ApiResponse({ status: 404, description: 'Employee not found' })  
  async updateEmployee(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    try {
      const updatedEmployee = await this.employeeInterface.updateEmployee(id, updateEmployeeDto);
      if (!updatedEmployee) {
        throw new NotFoundException('Employee not found');
      }
      return updatedEmployee;
    } catch (err) {
      console.error('Update error:', err); 
      throw err;
    }
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete an employee by ID' })
  @ApiResponse({ status: 200, description: 'Employee deleted successfully' })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  async deleteEmployee(@Param('id') id: string) {
    const deletedEmployee = await this.employeeInterface.deleteEmployee(id);
    if (!deletedEmployee) {
      throw new NotFoundException('Employee not found');
    }
    return deletedEmployee;
  }
}
