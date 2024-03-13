import { HttpException, HttpStatus } from "@nestjs/common";


export class CountException extends HttpException {
    constructor() {
        super('Count is not valid', HttpStatus.BAD_REQUEST);
    }
}


export class TransactionNotFoundException extends HttpException {
    constructor() {
        super('Transaction Not Found', HttpStatus.NOT_FOUND);
    }
}