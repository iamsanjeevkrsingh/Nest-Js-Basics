import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, desc: string, price: number) {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);
    return prodId;
  }

  getProducts() {
    return [...this.products];
  }

  getProduct(productId: string) {
    const [product] = this.findProduct(productId);
    return { ...product };
  }

  updateProduct(productId: string, title: string, desc: string, price: number) {
    const [product, index] = this.findProduct(productId);
    this.products[index] = {
      ...product,
      ...(title ? { title } : {}),
      ...(desc ? { desc } : {}),
      ...(price ? { price } : {}),
    };
  }

  deleteProduct(productId: string) {
    const products = this.products.filter((key) => key.id !== productId);
    this.products = products;
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    const product = this.products[productIndex];
    if (!product) throw new NotFoundException('Could not find product!');
    return [product, productIndex];
  }
}
