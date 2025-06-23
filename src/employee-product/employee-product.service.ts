import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EmployeeProduct } from './employee-product.schema';
import { Model } from 'mongoose';
import { CreateEmployeeProductDto } from './dtos/create-employee-product.dto';
import { UpdateEmployeeProductDto } from './dtos/update-employee-product.dto';
import { EmployeeProductInterface } from './interface/employee-product.interface';
import { InjectModel } from '@nestjs/mongoose';
import { EmployeeInterface } from 'src/employee/interface/employee.interface';
import { ProductInterface } from 'src/product/interface/product.interface';

@Injectable()
export class EmployeeProductServiceImpl implements EmployeeProductInterface {
  constructor(
    @InjectModel(EmployeeProduct.name)
    private readonly employeeProductModel: Model<EmployeeProduct>,

    @Inject('EmployeeInterface')
    private readonly employeeInterface: EmployeeInterface,

    @Inject('ProductInterface')
    private readonly productInterface: ProductInterface,
  ) {}

  async createEmployeeProduct(
    createEmployeeProductDto: CreateEmployeeProductDto,
  ): Promise<EmployeeProduct> {
    try {
      const { employeeId, productId } = createEmployeeProductDto;

      const employee = await this.employeeInterface.findEmployeeById(employeeId);
      if (!employee) {
        throw new NotFoundException(`Employee with ID ${employeeId} not found`);
      }

      const product = await this.productInterface.findProductById(productId);
      if (!product) {
        throw new NotFoundException(`Product with ID ${productId} not found`);
      }

      const createdEmployeeProduct = new this.employeeProductModel(
        createEmployeeProductDto,
      );
      return await createdEmployeeProduct.save();
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create employee product: ' + error.message,
      );
    }
  }

  async findEmployeeProductById(id: string): Promise<EmployeeProduct | null> {
    try {
      const employeeProduct = await this.employeeProductModel
        .findById(id)
        .exec();
      if (!employeeProduct) {
        throw new NotFoundException('Employee product not found');
      }
      return employeeProduct;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to find employee product by ID: ' + error.message,
      );
    }
  }

  async findAllEmployeeProducts(): Promise<EmployeeProduct[]> {
    try {
      const employeeProducts = await this.employeeProductModel.find().exec();
      if (!employeeProducts || employeeProducts.length === 0) {
        throw new NotFoundException('No employee products found');
      }
      return employeeProducts;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to find all employee products: ' + error.message,
      );
    }
  }

  async updateEmployeeProduct(
    id: string,
    updateEmployeeProductDto: UpdateEmployeeProductDto,
  ): Promise<EmployeeProduct | null> {
    try {
      const updatedEmployeeProduct = await this.employeeProductModel
        .findByIdAndUpdate(id, updateEmployeeProductDto, {
          new: true,
          runValidators: true,
        })
        .exec();
      if (!updatedEmployeeProduct) {
        throw new NotFoundException('Employee product not found for update');
      }
      return updatedEmployeeProduct;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to update employee product: ' + error.message,
      );
    }
  }

  async deleteEmployeeProduct(id: string): Promise<EmployeeProduct | null> {
    try {
      const deletedEmployeeProduct = await this.employeeProductModel
        .findByIdAndDelete(id)
        .exec();
      if (!deletedEmployeeProduct) {
        throw new NotFoundException('Employee product not found for deletion');
      }
      return deletedEmployeeProduct;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to delete employee product: ' + error.message,
      );
    }
  }
}
