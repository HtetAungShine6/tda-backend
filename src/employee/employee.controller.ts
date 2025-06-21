import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, NotFoundException, UseGuards, Query } from '@nestjs/common';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { UpdateEmployeeDto } from './dtos/update-employee.dto';
import { EmployeeInterface } from './interface/employee.interface';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { EmpStatus } from './enums/emp-status.enum';
import { UpdateEmployeeStatusDto } from './dtos/update-employee-status.dto';

@ApiTags('Employee')  
@Controller('employee')
export class EmployeeController {
  constructor(
    @Inject('EmployeeInterface')
    private readonly employeeInterface: EmployeeInterface
  ) {}

  @Post()
  @Auth(AuthType.Bearer)
  @ApiBearerAuth('bearer-token')
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
  @Auth(AuthType.Bearer)
  @ApiBearerAuth('bearer-token')
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

  @Patch('/:id/status')
  @Auth(AuthType.Bearer)
  @ApiBearerAuth('bearer-token')
  @ApiOperation({ summary: 'Update employee status by ID' })
  @ApiBody({ type: UpdateEmployeeStatusDto })
  @ApiResponse({ status: 200, description: 'Employee status updated successfully' })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  async updateEmployeeStatus(@Param('id') id: string, @Body() updateEmployeeStatus: UpdateEmployeeStatusDto) {
    const updatedEmployee = await this.employeeInterface.updateEmployeeStatus(id, updateEmployeeStatus);
    if (!updatedEmployee) {
      throw new NotFoundException('Employee not found');
    }
    return updatedEmployee;
  }

  @Delete('/:id')
  @Auth(AuthType.Bearer)
  @ApiBearerAuth('bearer-token')
  @ApiOperation({ summary: 'Delete an employee by ID' })
  @ApiResponse({ status: 200, description: 'Employee deleted successfully' })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  async deleteEmployee(@Param('id') id: string) {
    const deletedEmployee = await this.employeeInterface.deleteEmployee(id);
    if (!deletedEmployee) {
      throw new NotFoundException('Employee not found');
    }
    return {
      message: 'Employee deleted successfully',
    };
  }
}
