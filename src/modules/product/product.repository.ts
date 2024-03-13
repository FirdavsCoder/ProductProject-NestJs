import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "./entities/product.entity";
import { Repository } from "typeorm";
import { ID } from "src/common/types/type";
import { IProductRepository } from "./interface/product.repository";  


export class ProductRepository implements IProductRepository {
    constructor(
        @InjectRepository(ProductEntity) private repository: Repository<ProductEntity>,
    ) {}

    async create(data: ProductEntity): Promise<ProductEntity> {
        return await this.repository.save(data);
    }

    async update(data: ProductEntity): Promise<ProductEntity> {
        await this.repository.update(data.id, data);
        return await this.repository.findOneBy({id: data.id});
    }

    async delete(id: ID): Promise<ProductEntity> {
        const found = await this.repository.findOneBy({id});
        await this.repository.delete(id);
        return found;
    }

    async findAll(): Promise<ProductEntity[]> {
        return await this.repository.find({relations: ['category', 'createdBy']});
    }

    async findOne(id: ID): Promise<ProductEntity> {
        return await this.repository.findOneBy({id});
    }
}