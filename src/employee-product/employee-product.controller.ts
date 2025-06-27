import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EmployeeProductInterface } from './interface/employee-product.interface';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { CreateEmployeeProductDto } from './dtos/create-employee-product.dto';
import { UpdateEmployeeProductDto } from './dtos/update-employee-product.dto';

@ApiTags('EmployeeProduct')
@Controller('employee-product')
export class EmployeeProductController {
  constructor(
    @Inject('EmployeeProductInterface')
    private readonly employeeProductInterface: EmployeeProductInterface,
  ) {}

  @Post()
  @Auth(AuthType.Bearer)
  @ApiBearerAuth('bearer-token')
  @ApiOperation({ summary: 'Create a new employee product' })
  @ApiBody({ type: CreateEmployeeProductDto })
  @ApiResponse({
    status: 201,
    description: 'Employee product created successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async createEmployeeProduct(
    @Body() createEmployeeProductDto: CreateEmployeeProductDto,
  ) {
    return this.employeeProductInterface.createEmployeeProduct(
      createEmployeeProductDto,
    );
  }

  @Get('/get-by-employee-id')
  @ApiOperation({ summary: 'Find employee products by employee ID' })
  @ApiQuery({
    name: 'employeeId',
    type: String,
    required: true,
    description: 'MongoDB _id of the employee',
  })
  @ApiResponse({
    status: 200,
    description: 'Employee products found successfully',
  })
  @ApiResponse({ status: 404, description: 'No employee products found' })
  async findEmployeeProductsByEmployeeId(@Query('employeeId') employeeId: string) {
    return this.employeeProductInterface.findEmployeeProductsByEmployeeId(employeeId);
  }

  @Get('/get-by-product-id')
  @ApiOperation({ summary: 'Find employee products by product ID' })
  @ApiQuery({
    name: 'productId',
    type: String,
    required: true, 
    description: 'MongoDB _id of the product',
  })
  @ApiResponse({
    status: 200,
    description: 'Employee products found successfully',
  })
  @ApiResponse({ status: 404, description: 'No employee products found' })
  async findEmployeeProductsByProductId(@Query('productId') productId: string) {
    return this.employeeProductInterface.findEmployeeProductsByProductId(productId);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Find an employee product by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'MongoDB _id of the employee-product',
  })
  @ApiResponse({
    status: 200,
    description: 'Employee product found successfully',
  })
  @ApiResponse({ status: 404, description: 'Employee product not found' })
  async findEmployeeProductById(@Param('id') id: string) {
    return this.employeeProductInterface.findEmployeeProductById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Find all employee products' })
  @ApiResponse({
    status: 200,
    description: 'Employee products found successfully',
  })
  @ApiResponse({ status: 404, description: 'No employee products found' })
  async findAllEmployeeProducts() {
    return this.employeeProductInterface.findAllEmployeeProducts();
  }

  @Patch('/:id')
  @Auth(AuthType.Bearer)
  @ApiBearerAuth('bearer-token')
  @ApiOperation({ summary: 'Update an employee product' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'MongoDB _id of the employee-product',
  })
  @ApiBody({ type: CreateEmployeeProductDto })
  @ApiResponse({
    status: 200,
    description: 'Employee product updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Employee product not found' })
  async updateEmployeeProduct(
    @Param('id') id: string,
    @Body() updateEmployeeProductDto: UpdateEmployeeProductDto,
  ) {
    return this.employeeProductInterface.updateEmployeeProduct(
      id,
      updateEmployeeProductDto,
    );
  }

  @Delete('/:id')
  @Auth(AuthType.Bearer)
  @ApiBearerAuth('bearer-token')
  @ApiOperation({ summary: 'Delete an employee product' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'MongoDB _id of the employee',
  })
  @ApiResponse({
    status: 200,
    description: 'Employee product deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Employee product not found' })
  async deleteEmployeeProduct(@Param('id') id: string) {
    return this.employeeProductInterface.deleteEmployeeProduct(id);
  }
}
