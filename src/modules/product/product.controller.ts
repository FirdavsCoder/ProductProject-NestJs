import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorator/currentUser';
import { UserEntity } from '../user/entities/user.entity';
import { Auth } from '../auth/decorator/auth.decorator';
import { AllProducts, RoleEnum } from 'src/common/enums/enum';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Auth(RoleEnum.ADMIN, RoleEnum.WORKER)
  @Post()
  create(
    @Body() createProductDto: CreateProductDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    return this.productService.create(createProductDto, currentUser);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(0)
  @CacheKey(AllProducts.ALLPRODUCTS)
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @ApiParam({ name: 'id', type: Number })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @ApiParam({ name: 'id', type: Number })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.delete(+id);
  }
}
