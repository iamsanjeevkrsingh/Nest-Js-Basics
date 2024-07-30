import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { ProductCategory } from './product-category.enums';

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

  findOneBy(id: number): Promise<Product | null> {
    return new Promise((resolve, reject) => {
      this.productsRepository
        .findOneBy({ id })
        .then((product) => resolve(product))
        .catch((err) => reject(err));
    });
  }

  create(
    title: string,
    description: string,
    price: number,
    category: ProductCategory,
  ): Promise<any> {
    return this.productsRepository.insert({
      title: title,
      description: description,
      price: price,
      category: category,
    });
  }

  count(): Promise<number> {
    return this.productsRepository.count();
  }

  findOne(id: number): Promise<Product> {
    return this.productsRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  findAndCount(id: number): Promise<unknown> {
    return this.productsRepository.findAndCount({
      where: {
        id: id,
      },
    });
  }

  findAndCountBy(id: number): Promise<unknown> {
    return this.productsRepository.findAndCountBy({
      id: id,
    });
  }
}
