import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ID } from 'src/common/types/type';
import { IUserRepository } from './interface/user.repo';
import { UpdateUserDto } from './dto/update-user.dto';

export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOne(id: ID): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id });
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOneByLogin(login: string): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ login });
  }

  async create(user: UserEntity): Promise<UserEntity> {
    return await this.userRepository.save(user);
  }

  async delete(id: ID): Promise<UserEntity> {
    const user = await this.findOne(id);
    return await this.userRepository.remove(user);
  }

  async update(id: ID, user: UpdateUserDto): Promise<UserEntity> {
    await this.userRepository.update(id, user);
    return await this.findOne(id);
  }
}
