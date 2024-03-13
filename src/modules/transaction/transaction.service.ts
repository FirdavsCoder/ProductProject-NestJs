import { Inject, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionRespository } from './transaction.repository';
import { TransactionEntity } from './entities/transaction.entity';
import { UserService } from '../user/user.service';
import { ProductService } from '../product/product.service';
import {
  CountException,
  TransactionNotFoundException,
} from './exception/transaction.exception';
import { UserEntity } from '../user/entities/user.entity';
import { ITransactionService } from './interfaces/transaction.service';
import { ResData } from 'src/lib/resData';
import { Cache } from 'cache-manager';
import { AllTransactions } from '../../common/enums/enum';

@Injectable()
export class TransactionService implements ITransactionService {
  constructor(
    @Inject('IUserService') private readonly userservice: UserService,
    @Inject('IProductService') private readonly producService: ProductService,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,

    private readonly repository: TransactionRespository,
  ) {}
  async create(
    transaction: CreateTransactionDto,
    currentUser: UserEntity,
  ): Promise<ResData<TransactionEntity>> {
    await this.userservice.findOne(transaction.userId);
    const { data: foundProduct } = await this.producService.findOne(
      transaction.productId,
    );
    if (foundProduct.count < 0 || foundProduct.count < transaction.count) {
      throw new CountException();
    }
    foundProduct.count = foundProduct.count - transaction.count;
    const newTransaction = new TransactionEntity();
    newTransaction.createdBy = currentUser;
    newTransaction.totalPrice = foundProduct.price * transaction.count;
    const created = Object.assign(newTransaction, transaction);
    const createdTransaction = await this.repository.create(
      created,
      foundProduct,
    );
    return new ResData<TransactionEntity>(
      'Transaction Created',
      201,
      createdTransaction,
    );
  }

  async findAll(): Promise<ResData<TransactionEntity[]>> {
    const foundTransactions = await this.repository.findAllTransactions();
    return new ResData<TransactionEntity[]>(
      'All Transactions',
      200,
      foundTransactions,
    );
  }

  async findOneByUserId(id: number): Promise<ResData<TransactionEntity[]>> {
    const foundTransaction = await this.repository.findOneByUserId(id);
    return new ResData<TransactionEntity[]>(
      'Transaction by userID',
      200,
      foundTransaction,
    );
  }

  async findOneByProductId(id: number): Promise<ResData<TransactionEntity[]>> {
    const foundTransaction = await this.repository.findOneByProductId(id);
    return new ResData<TransactionEntity[]>(
      'Transactions by productID',
      200,
      foundTransaction,
    );
  }

  async findOneById(id: number): Promise<ResData<TransactionEntity>> {
    const foundTransaction = await this.repository.findOneById(id);
    if (!foundTransaction) {
      throw new TransactionNotFoundException();
    }
    return new ResData<TransactionEntity>(
      'Transactions found by id',
      200,
      foundTransaction,
    );
  }

  async update(
    id: number,
    updateTransactionDto: UpdateTransactionDto,
    currentUser: UserEntity,
  ): Promise<ResData<TransactionEntity>> {
    const foundTransaction = await this.repository.findOneById(id);

    await this.userservice.findOne(updateTransactionDto.userId);

    const { data: foundProduct } = await this.producService.findOne(
      updateTransactionDto.productId,
    );

    if (
      foundProduct.count < 0 ||
      foundProduct.count < updateTransactionDto.count
    ) {
      throw new CountException();
    }
    // update product count
    foundProduct.count = foundProduct.count - updateTransactionDto.count;
    const updateTransaction = Object.assign(
      foundTransaction,
      updateTransactionDto,
    );
    updateTransaction.totalPrice =
      foundProduct.price * updateTransactionDto.count;
    updateTransaction.lastEditedBy = currentUser;

    // update transaction
    const updated = await this.repository.update(updateTransaction);
    await this.clearCache();
    return new ResData<TransactionEntity>('Transaction updated', 200, updated);
  }

  async remove(id: number): Promise<ResData<TransactionEntity>> {
    await this.repository.findOneById(id);
    const deleted = await this.repository.delete(id);
    await this.clearCache();
    return new ResData<TransactionEntity>('Transaction deleted', 200, deleted);
  }

  async clearCache() {
    await this.cacheManager.del(AllTransactions.ALLTRANSACTIONS);
  }
}
