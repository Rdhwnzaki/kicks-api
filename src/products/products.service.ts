import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<any> {
    const product = await this.productsRepository.find({
      relations: ['category'],
    });
    return {
      data: product,
    };
  }

  async findOne(id: number): Promise<any> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    return {
      data: product,
    };
  }

  create(product: Partial<Product>): Promise<Product> {
    return this.productsRepository.save(product);
  }

  update(id: number, product: Partial<Product>): Promise<Product> {
    return this.productsRepository.save({ ...product, id });
  }

  async remove(id: number): Promise<void> {
    await this.productsRepository.delete(id);
  }
}
