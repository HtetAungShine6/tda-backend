import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductServiceImpl } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      }
    ])
  ],
  controllers: [ProductController],
  providers: [
    ProductServiceImpl,
    {
      provide: 'ProductInterface',
      useExisting: ProductServiceImpl,
    }
  ],
  exports: [ProductServiceImpl, 'ProductInterface'],
})
export class ProductModule {}
