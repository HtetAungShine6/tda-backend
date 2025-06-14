import { Injectable } from '@nestjs/common';
import { ProductInterface } from './interface/product.interface';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-prodcut.dto';
import { Product } from './product.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductServiceImpl implements ProductInterface {
    constructor(
        @InjectModel(Product.name) 
        private readonly productModel: Model<Product>,
    ) {}

    async createProduct(createProductDto: CreateProductDto): Promise<Product> {
        const createdProduct = new this.productModel(createProductDto);
        return createdProduct.save();
    }

    async findProductById(id: string): Promise<Product | null> {
        return this.productModel.findById(id).exec();
    }

    async findAllProducts(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<Product | null> {
        return this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec();
    }

    async deleteProduct(id: string): Promise<Product | null> {
        return this.productModel.findByIdAndDelete(id).exec();
    }
}
