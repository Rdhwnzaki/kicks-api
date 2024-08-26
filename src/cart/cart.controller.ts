import {
  Controller,
  Post,
  Put,
  Delete,
  Get,
  Body,
  Param,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  async addToCart(
    @Body()
    {
      userId,
      productId,
      quantity,
    }: {
      userId: number;
      productId: number;
      quantity: number;
    },
  ) {
    return this.cartService.addToCart(userId, productId, quantity);
  }

  @Put('update')
  async updateCart(
    @Body()
    {
      userId,
      productId,
      quantity,
    }: {
      userId: number;
      productId: number;
      quantity: number;
    },
  ) {
    return this.cartService.updateCart(userId, productId, quantity);
  }

  @Get('user/:userId')
  async getCartByUserId(@Param('userId') userId: number) {
    return this.cartService.getCartByUserId(userId);
  }

  @Delete('remove')
  async removeFromCart(
    @Body() { userId, productId }: { userId: number; productId: number },
  ) {
    return this.cartService.removeFromCart(userId, productId);
  }
}
