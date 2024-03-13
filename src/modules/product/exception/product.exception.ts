import { HttpException, HttpStatus } from '@nestjs/common';

export class ProductNotFoundException extends HttpException {
  constructor() {
    super('Product Not Found', HttpStatus.NOT_FOUND);
  }
}
