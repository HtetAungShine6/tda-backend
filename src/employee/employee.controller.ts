import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  NotFoundException,
  UseGuards,
  Query,
  Put,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { UpdateEmployeeDto } from './dtos/update-employee.dto';
import { EmployeeInterface } from './interface/employee.interface';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { UpdateEmployeeStatusDto } from './dtos/update-employee-status.dto';
import { ApiErrorResponse, ApiSuccessResponse } from 'src/helpers/swagger.helper';
import { Employee } from './employee.schema';

@ApiTags('Employee')
@ApiExtraModels(Employee)
@Controller('employee')
export class EmployeeController {
  constructor(
    @Inject('EmployeeInterface')
    private readonly employeeInterface: EmployeeInterface,
  ) {}

  @Post()
  @Auth(AuthType.Bearer)
  @ApiBearerAuth('bearer-token')
  @ApiOperation({ summary: 'Create a new employee' })
  @ApiBody({ type: CreateEmployeeDto })
  async createEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeInterface.createEmployee(createEmployeeDto);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Find an employee by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'MongoDB _id of the employee',
  })
  async findEmployeeById(@Param('id') id: string) {
    return this.employeeInterface.findEmployeeById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Find all employees' })
  async findAllEmployees() {
    return this.employeeInterface.findAllEmployees();
  }

  @Patch('/:id')
  @Auth(AuthType.Bearer)
  @ApiBearerAuth('bearer-token')
  @ApiOperation({ summary: 'Update an employee by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'MongoDB _id of the employee',
  })
  @ApiBody({ type: UpdateEmployeeDto })
  async updateEmployee(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    const updatedEmployee = await this.employeeInterface.updateEmployee(
      id,
      updateEmployeeDto,
    );
    return this.employeeInterface.updateEmployee(id, updateEmployeeDto);
  }

  @Patch('/:id/status')
  @Auth(AuthType.Bearer)
  @ApiBearerAuth('bearer-token')
  @ApiOperation({ summary: 'Update employee status by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'MongoDB _id of the employee',
  })
  @ApiBody({ type: UpdateEmployeeStatusDto })
  async updateEmployeeStatus(
    @Param('id') id: string,
    @Body() updateEmployeeStatus: UpdateEmployeeStatusDto,
  ) {
    return this.employeeInterface.updateEmployeeStatus(
      id,
      updateEmployeeStatus,
    );
  }

  @Delete('/:id')
  @Auth(AuthType.Bearer)
  @ApiBearerAuth('bearer-token')
  @ApiOperation({ summary: 'Delete an employee by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'MongoDB _id of the employee',
  })
  async deleteEmployee(@Param('id') id: string) {
    return this.employeeInterface.deleteEmployee(id);
  }
}
