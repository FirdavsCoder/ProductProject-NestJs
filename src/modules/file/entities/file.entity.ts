import { BaseEntity } from '../../../common/database/base.entity';
import { Column, Entity } from 'typeorm';
// import { ProductEntity } from "../../product/entities/product.entity";
// import { Column, Entity } from "typeorm";

@Entity('files')
export class FileEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  location: string;

  @Column({ type: 'varchar', nullable: false })
  mimetype: string;

  @Column({ type: 'int', nullable: false })
  size: number;
}
