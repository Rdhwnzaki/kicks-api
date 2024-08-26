import {
  Controller,
  Post,
  Put,
  Body,
  Param,
  Get,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { extname } from 'path';
import { Multer } from 'multer';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('all')
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async create(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() productData: Partial<Product>,
  ) {
    // const imagePaths = files.map((file) => file.filename);
    const product = {
      ...productData,
      images: productData.images,
    };
    return this.productsService.create(product);
  }

  @Put(':id')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: number,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() productData: Partial<Product>,
  ) {
    const imagePaths = files.map((file) => file.filename);
    const product = {
      ...productData,
      images: imagePaths,
    };
    return this.productsService.update(id, product);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
