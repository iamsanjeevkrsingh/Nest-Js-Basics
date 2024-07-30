import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      this.productsRepository
        .find()
        .then((products) => resolve(products))
        .catch((err) => reject(err));
    });
  }

  findOne(id: number): Promise<Product | null> {
    return new Promise((resolve, reject) => {
      this.productsRepository
        .findOneBy({ id })
        .then((product) => resolve(product))
        .catch((err) => reject(err));
    });
  }

  create(title: string, description: string, price: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.productsRepository
        .insert({
          title: title,
          description: description,
          price: price,
        })
        .then((product) => resolve(product))
        .catch((err) => reject(err));
    });
  }
}
