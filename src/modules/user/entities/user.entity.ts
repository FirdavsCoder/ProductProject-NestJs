import { BaseEntity } from 'src/common/database/base.entity';
import { RoleEnum } from 'src/common/enums/enum';
import { TransactionEntity } from 'src/modules/transaction/entities/transaction.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ name: 'full_name', type: 'varchar', length: 255, nullable: true })
  fullName: string;

  @Column({ name: 'login', type: 'varchar', length: 255, nullable: false })
  login: string;

  @Column({ name: 'password', type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ type: 'text', nullable: false })
  role: RoleEnum;

  @OneToMany(
    () => TransactionEntity,
    (transactionEntity) => transactionEntity.user,
  )
  transactions: Array<TransactionEntity>;
}
