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
  createEmployeeProduct(
    @Body() createEmployeeProductDto: CreateEmployeeProductDto,
  ) {
    return this.employeeProductInterface.createEmployeeProduct(
      createEmployeeProductDto,
    );
  }

  @Get('/by-employee-id')
  @ApiOperation({ summary: 'Find employee products by employee ID' })
  @ApiQuery({
    name: 'employeeId',
    type: String,
    required: true,
    description: 'MongoDB _id of the employee',
  })
  findEmployeeProductsByEmployeeId(@Query('employeeId') employeeId: string) {
    return this.employeeProductInterface.findEmployeeProductsByEmployeeId(employeeId);
  }

  @Get('/by-product-id')
  @ApiOperation({ summary: 'Find employee products by product ID' })
  @ApiQuery({
    name: 'productId',
    type: String,
    required: true, 
    description: 'MongoDB _id of the product',
  })
  findEmployeeProductsByProductId(@Query('productId') productId: string) {
    return this.employeeProductInterface.findEmployeeProductsByProductId(productId);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Find an employee product by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'MongoDB _id of the employee-product',
  })
  findEmployeeProductById(@Param('id') id: string) {
    return this.employeeProductInterface.findEmployeeProductById(id);
  }

  // @Get()
  // @ApiOperation({ summary: 'Find all employee products' })
  // findAllEmployeeProducts() {
  //   return this.employeeProductInterface.findAllEmployeeProducts();
  // }

  @Get()
  @ApiOperation({ summary: 'Find all employee products with pagination' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number (default is 1)', type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Number of items per page (default is 10)', type: Number, example: 10 })
  findAllEmployeeProducts(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.employeeProductInterface.findAllEmployeeProducts(Number(page), Number(limit));
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
  updateEmployeeProduct(
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
  deleteEmployeeProduct(@Param('id') id: string) {
    return this.employeeProductInterface.deleteEmployeeProduct(id);
  }
}
