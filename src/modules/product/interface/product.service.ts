import { ResData } from "src/lib/resData";
import { CreateProductDto } from "../dto/create-product.dto";
import { ProductEntity } from "../entities/product.entity";
import { UpdateProductDto } from "../dto/update-product.dto";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { ID } from "src/common/types/type";

export interface IProductService {
    create(data: CreateProductDto, currentUser: UserEntity): Promise<ResData<ProductEntity>>,
    update(id: ID, data: UpdateProductDto): Promise<ResData<ProductEntity>>,
    delete(id: number): Promise<ResData<ProductEntity>>,
    findAll(): Promise<ResData<ProductEntity[]>>,
    findOne(id: number): Promise<ResData<ProductEntity>>,
}