import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { AuthModule } from './modules/auth/auth.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './modules/category/category.module';
import { UserEntity } from './modules/user/entities/user.entity';
import { ProductEntity } from './modules/product/entities/product.entity';
import { CategoryEntity } from './modules/category/entities/category.entity';
import { TransactionEntity } from './modules/transaction/entities/transaction.entity';
import { SharedModule } from './modules/shared/shared.module';
import { config } from './common/config/config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        const store = await redisStore({
          socket: { host: '127.0.0.1', port: 6379 },
          ttl: 10 * 1000,
        });
        return { store };
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.dbHost,
      port: config.dbPort,
      username: config.dbUser,
      password: config.dbPassword,
      database: config.dbName,
      entities: [UserEntity, ProductEntity, CategoryEntity, TransactionEntity],
      synchronize: true,
    }),
    UserModule,
    ProductModule,
    CategoryModule,
    AuthModule,
    TransactionModule,
    SharedModule,
  ],
})
export class AppModule {}
