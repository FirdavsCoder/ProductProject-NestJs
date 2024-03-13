import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TransactionRespository } from './transaction.repository';
import { TransactionEntity } from './entities/transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../shared/shared.module';
import { ProductService } from '../product/product.service';
import { ProductEntity } from '../product/entities/product.entity';
import { ProductRepository } from '../product/product.repository';
import { CategoryService } from '../category/category.service';
import { CategoryRepository } from '../category/category.repository';
import { CategoryEntity } from '../category/entities/category.entity';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity, ProductEntity, CategoryEntity, UserEntity]), SharedModule],
  controllers: [TransactionController],
  providers: [
  TransactionService, TransactionRespository, ProductRepository, CategoryService, CategoryRepository,
  {provide : "IUserRepository", useClass: UserRepository},
  {provide : "IUserService", useClass: UserService},
  {provide: "IProductService", useClass: ProductService},
  // {provide: "IProductRepository", useClass: ProductRepository},
  // {provide :"ICategoryService", useClass : CategoryService},
  // {provide :"ICategoryRepository", useClass : CategoryRepository},
  ],
})
export class TransactionModule {}
