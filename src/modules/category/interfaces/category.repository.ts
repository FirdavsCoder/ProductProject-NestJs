import { ID } from 'src/common/types/type';
import { CategoryEntity } from '../entities/category.entity';

export interface ICategoryRepository {
  create(data: CategoryEntity): Promise<CategoryEntity>;
  findOneById(id: ID): Promise<CategoryEntity>;
  findAll(): Promise<CategoryEntity[]>;
  update(id: ID, data: CategoryEntity): Promise<CategoryEntity>;
  delete(id: ID): Promise<CategoryEntity>;
}
