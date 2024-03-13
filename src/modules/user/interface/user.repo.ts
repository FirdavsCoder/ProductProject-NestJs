import { UserEntity } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';

export interface IUserRepository {
  findOne(id: number): Promise<UserEntity>;
  findAll(): Promise<UserEntity[]>;
  findOneByLogin(login: string): Promise<UserEntity>;
  create(user: UserEntity): Promise<UserEntity>;
  delete(id: number): Promise<UserEntity>;
  update(id: number, user: UpdateUserDto): Promise<UserEntity>;
}
