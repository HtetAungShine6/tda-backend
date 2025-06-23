import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ProductInterface } from './interface/product.interface';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-prodcut.dto';
import { Product } from './product.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Not } from 'typeorm';

@Injectable()
export class ProductServiceImpl implements ProductInterface {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const createdProduct = new this.productModel(createProductDto);
      return await createdProduct.save();
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create product: ' + error.message,
      );
    }
  }

  async findProductById(id: string): Promise<Product | null> {
    try {
      const product = await this.productModel.findById(id).exec();
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      return product;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to find product by ID: ' + error.message,
      );
    }
  }

  async findAllProducts(): Promise<Product[]> {
    try {
      const products = await this.productModel.find().exec();
      if (!products || products.length === 0) {
        throw new NotFoundException('No products found');
      }
      return products;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to find all products: ' + error.message,
      );
    }
  }

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product | null> {
    try {
      const existingProduct = await this.productModel
        .findByIdAndUpdate(id, updateProductDto, {
          new: true,
          runValidators: true,
        })
        .exec();
      if (!existingProduct) {
        throw new NotFoundException('Product not found');
      }
      return existingProduct;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to update product: ' + error.message,
      );
    }
  }

  async deleteProduct(id: string): Promise<Product | null> {
    try {
        const productToDelete = await this.productModel.findByIdAndDelete(id).exec();
        if (!productToDelete) {
          throw new NotFoundException('Product not found');
        }  
        return productToDelete
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to delete product: ' + error.message,
      );
    }
  }
}
