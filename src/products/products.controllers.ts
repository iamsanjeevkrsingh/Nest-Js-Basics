import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  addProduct(
    // @Body completeBody : {title: string, description: string, price: number}
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const prodId = this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return {
      id: prodId,
    };
  }

  @Get()
  getAllProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') productId: string) {
    return this.productsService.getProduct(productId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    return this.productsService.updateProduct(
      prodId,
      prodTitle,
      prodDesc,
      prodPrice,
    );
  }

  @Delete(':id')
  removeProduct(@Param('id') prodId: string) {
    this.productsService.deleteProduct(prodId);
    return null;
  }
}
