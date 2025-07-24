import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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
  ) {}

  @Post()
  @Auth(AuthType.Bearer)
  @ApiBearerAuth('bearer-token')
  @ApiOperation({ summary: 'Create a new product' })
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productInterface.createProduct(createProductDto);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Find a product by ID' })
  findProductById(@Param('id') id: string) {
    return this.productInterface.findProductById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Find all products' })
  findAllProducts() {
    return this.productInterface.findAllProducts();
  }

  @Patch('/:id')
  @Auth(AuthType.Bearer)
  @ApiBearerAuth('bearer-token')
  @ApiOperation({ summary: 'Update a product by ID' })
  updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productInterface.updateProduct(id, updateProductDto);
  }

  @Delete('/:id')
  @Auth(AuthType.Bearer)
  @ApiBearerAuth('bearer-token')
  @ApiOperation({ summary: 'Delete a product by ID' })
  deleteProduct(@Param('id') id: string) {
    return this.productInterface.deleteProduct(id);
  }
}
