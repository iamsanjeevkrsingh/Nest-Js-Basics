import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ProductCategory } from './product-category.enums';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ type: 'enum', enum: ProductCategory, default: ProductCategory.MEN })
  category: ProductCategory;
}
