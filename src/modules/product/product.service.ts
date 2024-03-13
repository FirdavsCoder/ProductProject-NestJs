import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProductService } from './interface/product.service';
import { ResData } from 'src/lib/resData';
import { ProductEntity } from './entities/product.entity';
import { ProductRepository } from './product.repository';
import { CategoryNotFoundException } from '../category/exception/category.exception';
import { CategoryService } from '../category/category.service';
import { UserEntity } from '../user/entities/user.entity';
import { ProductNotFoundException } from './exception/product.exception';
import { ID } from 'src/common/types/type';
import { Cache } from 'cache-manager';
import { AllProducts } from '../../common/enums/enum';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryService: CategoryService,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {}

  async create(
    data: CreateProductDto,
    currentUser: UserEntity,
  ): Promise<ResData<ProductEntity>> {
    await this.clearCache();
    const { data: foundCategory } = await this.categoryService.findOneById(
      data.categoryId,
    );
    if (!foundCategory) {
      throw new CategoryNotFoundException();
    }
    const product = new ProductEntity();
    Object.assign(product, data);
    product.category = foundCategory;
    product.createdBy = currentUser;
    console.log(currentUser);

    const createdProduct = await this.productRepository.create(product);
    return new ResData(
      'Product created successfully',
      HttpStatus.CREATED,
      createdProduct,
    );
  }

  async update(
    id: ID,
    data: UpdateProductDto,
  ): Promise<ResData<ProductEntity>> {
    await this.clearCache();
    const { data: foundProduct } = await this.findOne(id);
    Object.assign(foundProduct, data);
    const updatedProduct = await this.productRepository.update(foundProduct);
    return new ResData(
      'Product updated successfully',
      HttpStatus.OK,
      updatedProduct,
    );
  }

  async delete(id: number): Promise<ResData<ProductEntity>> {
    await this.clearCache();
    await this.findOne(id);
    const deletedProduct = await this.productRepository.delete(id);
    return new ResData(
      'Product deleted successfully',
      HttpStatus.OK,
      deletedProduct,
    );
  }

  async findAll(): Promise<ResData<ProductEntity[]>> {
    const allProducts = await this.productRepository.findAll();
    return new ResData('All products', HttpStatus.OK, allProducts);
  }

  async findOne(id: number): Promise<ResData<ProductEntity>> {
    const foundProduct = await this.productRepository.findOne(id);
    if (!foundProduct) {
      throw new ProductNotFoundException();
    }
    return new ResData('Product found', HttpStatus.OK, foundProduct);
  }

  async clearCache() {
    await this.cacheManager.del(AllProducts.ALLPRODUCTS);
  }
}
