import { ID } from "src/common/types/type";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { UpdateCategoryDto } from "../dto/update-category.dto";
import { CategoryEntity } from "../entities/category.entity";
import { ResData } from "src/lib/resData";

export interface ICategoryService {
    create(data: CreateCategoryDto): Promise<ResData<CategoryEntity>>,
    findOneById(id: ID): Promise<ResData<CategoryEntity>>,
    findAll(): Promise<ResData<Array<CategoryEntity>>>,
    update(id: ID, data: UpdateCategoryDto): Promise<ResData<CategoryEntity>>,
    delete(id: ID): Promise<ResData<CategoryEntity>>
}