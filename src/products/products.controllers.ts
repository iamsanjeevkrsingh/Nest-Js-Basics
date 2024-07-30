import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductCategory } from './product-category.enums';

@Controller('api')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('product')
  createProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
    @Body('category') prodCategory: ProductCategory,
  ) {
    return this.productsService.create(
      prodTitle,
      prodDesc,
      prodPrice,
      prodCategory,
    );
  }

  @Get('products')
  getProducts() {
    return this.productsService.findAll();
  }

  @Get('products/:id')
  findProduct(@Param('id') productId: number) {
    return this.productsService.findOne(productId);
  }

  @Get('products/:id')
  getProduct(@Param('id') productId: number) {
    return this.productsService.findOneBy(productId);
  }

  @Get('all-products-count')
  getTotalProductsCount() {
    return this.productsService.count();
  }

  @Get('find-and-count')
  findAndCount(@Query('id') id: number) {
    return this.productsService.findAndCount(id);
  }

  @Get('find-and-count-by')
  findAndCountBy(@Query('id') id: number) {
    return this.productsService.findAndCountBy(id);
  }
}
