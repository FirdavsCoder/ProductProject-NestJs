import { BaseEntity } from 'src/common/database/base.entity';
import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('categories')
export class CategoryEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 36, unique: true, nullable: false })
  name: string;

  @OneToMany(() => ProductEntity, (productEntity) => productEntity.category)
  products: Array<ProductEntity>;
}
