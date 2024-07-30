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
    return new Promise((resolve, reject) => {
      this.productsRepository
        .insert({
          title: title,
          description: description,
          price: price,
          category: category,
        })
        .then((product) => resolve(product))
        .catch((err) => reject(err));
    });
  }

  count(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.productsRepository
        .count()
        .then((product) => resolve(product))
        .catch((err) => reject(err));
    });
  }

  findOne(id: number): Promise<Product> {
    return new Promise((resolve, reject) => {
      this.productsRepository
        .findOne({
          where: {
            id: id,
          },
        })
        .then((product) => resolve(product))
        .catch((err) => reject(err));
    });
  }

  findAndCount(id: number): Promise<unknown> {
    return new Promise((resolve, reject) => {
      this.productsRepository
        .findAndCount({
          where: {
            id: id,
          },
        })
        .then(([product, totalCount]) => {
          return resolve([product, totalCount]);
        })
        .catch((err) => reject(err));
    });
  }

  findAndCountBy(id: number): Promise<unknown> {
    return new Promise((resolve, reject) => {
      this.productsRepository
        .findAndCountBy({
          id: id,
        })
        .then(([product, totalCount]) => {
          return resolve([product, totalCount]);
        })
        .catch((err) => reject(err));
    });
  }
}
