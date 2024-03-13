import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { ID } from 'src/common/types/type';
import { ICategoryRepository } from './interfaces/category.repository';

export class CategoryRepository implements ICategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private repository: Repository<CategoryEntity>,
  ) {}

  async create(data: Partial<CategoryEntity>): Promise<CategoryEntity> {
    return await this.repository.save(data);
  }

  async findOneById(id: ID): Promise<CategoryEntity> {
    return await this.repository.findOneBy({ id });
  }

  async findAll(): Promise<CategoryEntity[]> {
    return await this.repository.find();
  }

  async update(id: ID, data: Partial<CategoryEntity>): Promise<CategoryEntity> {
    await this.repository.update(id, data);
    return await this.repository.findOneBy({ id });
  }

  async delete(id: ID): Promise<CategoryEntity> {
    const found = await this.repository.findOneBy({ id });
    await this.repository.delete(id);
    return found;
  }
}
