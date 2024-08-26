import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/categories.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column()
  brandName: string;

  @Column()
  sku: string;

  @Column('int')
  stockQty: number;

  @Column('decimal')
  regPrice: number;

  @Column('decimal')
  salePrice: number;

  @Column('simple-array')
  images: string[];
}
