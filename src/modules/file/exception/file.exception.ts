import { HttpException, HttpStatus } from '@nestjs/common';

export class FileTypeException extends HttpException {
  constructor(fileType: string) {
    super('File Type expected image but ' + fileType, HttpStatus.BAD_REQUEST);
  }
}

export class FileNotFound extends HttpException {
  constructor() {
    super('File Not Found', 404);
  }
}
