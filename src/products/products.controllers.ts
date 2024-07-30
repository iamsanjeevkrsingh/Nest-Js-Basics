import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('api')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('product')
  createProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    return this.productsService.create(prodTitle, prodDesc, prodPrice);
  }

  @Get('products')
  getProducts() {
    return this.productsService.findAll();
  }

  @Get('products/:id')
  getProduct(@Param('id') productId: number) {
    return this.productsService.findOne(productId);
  }

  // @Patch(':id')
  // updateProduct(
  //   @Param('id') prodId: string,
  //   @Body('title') prodTitle: string,
  //   @Body('description') prodDesc: string,
  //   @Body('price') prodPrice: number,
  // ) {
  //   return this.productsService.updateProduct(
  //     prodId,
  //     prodTitle,
  //     prodDesc,
  //     prodPrice,
  //   );
  // }

  // @Delete(':id')
  // removeProduct(@Param('id') prodId: string) {
  //   this.productsService.deleteProduct(prodId);
  //   return null;
  // }
}
