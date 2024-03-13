import { ResData } from 'src/lib/resData';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';

export interface IUserService {
  create(createUserDto: UserEntity): Promise<ResData<UserEntity>>;
  findAll(): Promise<ResData<UserEntity[]>>;
  findOne(id: number): Promise<ResData<UserEntity>>;
  findOneByLogin(login: string): Promise<ResData<UserEntity>>;
  delete(id: number): Promise<ResData<UserEntity>>;
  update(id: number, user: UpdateUserDto): Promise<ResData<UserEntity>>;
}
