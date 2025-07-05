import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ProductInterface } from './interface/product.interface';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-prodcut.dto';
import { Product } from './product.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { throwIfNotFound } from 'src/helpers/throwIfNotFound';

@Injectable()
export class ProductServiceImpl implements ProductInterface {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    return this.productModel.create(createProductDto);
  }

  async findProductById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    return throwIfNotFound(product, id, 'Product') as Product;
  }

  async findAllProducts(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const productToUpdate = await this.productModel.findByIdAndUpdate(id, updateProductDto, {
      new: true,
      runValidators: true,
    }).exec();
    return throwIfNotFound(productToUpdate, id, 'Product') as Product;
  }

  async deleteProduct(id: string): Promise<Product> {
    const productToDelete = await this.productModel.findByIdAndDelete(id).exec();
    return throwIfNotFound(productToDelete, id, 'Product') as Product;
  }
}
