import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  async addToCart(
    userId: number,
    productId: number,
    quantity: number,
  ): Promise<Cart> {
    const cartItem = await this.cartRepository.findOne({
      where: { user: { id: userId }, product: { id: productId } },
    });
    if (cartItem) {
      cartItem.quantity += quantity;
      return this.cartRepository.save(cartItem);
    } else {
      const newCartItem = this.cartRepository.create({
        user: { id: userId },
        product: { id: productId },
        quantity,
      });
      return this.cartRepository.save(newCartItem);
    }
  }

  async updateCart(
    userId: number,
    productId: number,
    quantity: number,
  ): Promise<Cart> {
    const cartItem = await this.cartRepository.findOne({
      where: { user: { id: userId }, product: { id: productId } },
    });
    if (cartItem) {
      cartItem.quantity = quantity;
      return this.cartRepository.save(cartItem);
    }
    throw new Error('Cart item not found');
  }

  async getCartByUserId(userId: number): Promise<any> {
    const cart = await this.cartRepository.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });
    return {
      data: cart,
    };
  }

  async removeFromCart(userId: number, productId: number): Promise<void> {
    await this.cartRepository.delete({
      user: { id: userId },
      product: { id: productId },
    });
  }
}
