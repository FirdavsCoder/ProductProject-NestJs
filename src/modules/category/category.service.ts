import { Injectable } from '@nestjs/common';
import { ICategoryService } from './interfaces/category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { CategoryRepository } from './category.repository';
import { CategoryNotFoundException } from './exception/category.exception';
import { ResData } from 'src/lib/resData';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async create(data: CreateCategoryDto): Promise<ResData<CategoryEntity>> {
    const newCategory = new CategoryEntity();
    newCategory.name = data.name;
    const createdCategory = await this.categoryRepository.create(newCategory);
    return new ResData<CategoryEntity>('success', 201, createdCategory);
  }

  async findOneById(id: number): Promise<ResData<CategoryEntity>> {
    const foundCategory = await this.categoryRepository.findOneById(id);
    if (!foundCategory) {
      throw new CategoryNotFoundException();
    }
    return new ResData<CategoryEntity>('success', 200, foundCategory);
  }

  async findAll(): Promise<ResData<Array<CategoryEntity>>> {
    const allCategories = await this.categoryRepository.findAll();
    return new ResData<Array<CategoryEntity>>('success', 200, allCategories);
  }
  async update(
    id: number,
    data: UpdateCategoryDto,
  ): Promise<ResData<CategoryEntity>> {
    await this.findOneById(id);
    const updatedCategory = await this.categoryRepository.update(id, data);
    return new ResData<CategoryEntity>('success', 200, updatedCategory);
  }

  async delete(id: number): Promise<ResData<CategoryEntity>> {
    await this.findOneById(id);
    const deletedCategory = await this.categoryRepository.delete(id);
    return new ResData<CategoryEntity>('success', 200, deletedCategory);
  }
}
