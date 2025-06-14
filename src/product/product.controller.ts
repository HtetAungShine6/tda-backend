import { Body, Controller, Delete, Get, Inject, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductInterface } from './interface/product.interface';
import { CreateProductDto } from './dtos/create-product.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { UpdateProductDto } from './dtos/update-prodcut.dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
    constructor(
        @Inject('ProductInterface')
        private readonly productInterface: ProductInterface,
    ){}

    @Post()
    @Auth(AuthType.Bearer)
    @ApiBearerAuth('bearer-token')
    @ApiOperation({ summary: 'Create a new product' })
    @ApiResponse({ status: 201, description: 'Product created successfully' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async createProduct(@Body() createProductDto: CreateProductDto) {
        return this.productInterface.createProduct(createProductDto);
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Find a product by ID' })
    @ApiResponse({ status: 200, description: 'Product found successfully' })
    @ApiResponse({ status: 404, description: 'Product not found' })
    async findProductById(@Param('id') id: string) {
        const product = await this.productInterface.findProductById(id);
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return product;
    }

    @Get()
    @ApiOperation({ summary: 'Find all products' })
    @ApiResponse({ status: 200, description: 'Products found successfully' })
    async findAllProducts() {
        const products = await this.productInterface.findAllProducts();
        if (!products || products.length === 0) {
            throw new NotFoundException('No products found');
        }
        return products;
    }

    @Patch('/:id')
    @Auth(AuthType.Bearer)
    @ApiBearerAuth('bearer-token')
    @ApiOperation({ summary: 'Update a product by ID' })
    @ApiResponse({ status: 200, description: 'Product updated successfully' })
    @ApiResponse({ status: 404, description: 'Product not found' })
    async updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        const updatedProduct = await this.productInterface.updateProduct(id, updateProductDto);
        if (!updatedProduct) {
            throw new NotFoundException('Product not found');
        }
        return updatedProduct;
    }

    @Delete('/:id')
    @Auth(AuthType.Bearer)
    @ApiBearerAuth('bearer-token')
    @ApiOperation({ summary: 'Delete a product by ID' })
    @ApiResponse({ status: 200, description: 'Product deleted successfully' })
    @ApiResponse({ status: 404, description: 'Product not found' }) 
    async deleteProduct(@Param('id') id: string) {
        const deletedProduct = await this.productInterface.deleteProduct(id);
        if (!deletedProduct) {
            throw new NotFoundException('Product not found');
        }
        return {
            message: 'Product deleted successfully',
        };
    }
}
