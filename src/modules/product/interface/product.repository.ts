import { ID } from "src/common/types/type";
import { ProductEntity } from "../entities/product.entity";


export interface IProductRepository {
    create(data: ProductEntity): Promise<ProductEntity>,
    update(data: ProductEntity): Promise<ProductEntity>,
    delete(id: ID): Promise<ProductEntity>,
    findAll(): Promise<ProductEntity[]>,
    findOne(id: ID): Promise<ProductEntity>,
}