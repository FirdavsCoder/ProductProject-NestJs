import { Inject, Injectable } from '@nestjs/common';
import { IUserService } from './interface/user.service';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { ResData } from 'src/lib/resData';
import {
  UserAlreadyExistException,
  UserNotFoundException,
} from './exception/user.exception';
import { Cache } from 'cache-manager';
import { AllUsers, UserById } from '../../common/enums/enum';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService implements IUserService {
  // Constructor
  constructor(
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
    private readonly userRepository: UserRepository,
  ) {}

  // Methods

  // Create User
  async create(createUserDto: UserEntity): Promise<ResData<UserEntity>> {
    await this.clearCache();
    const userByLogin = await this.userRepository.findOneByLogin(
      createUserDto.login,
    );
    if (userByLogin) {
      throw new UserAlreadyExistException();
    }
    const createdUser = await this.userRepository.create(createUserDto);
    return new ResData('User Created', 201, createdUser);
  }

  // Find All Users
  async findAll(): Promise<ResData<UserEntity[]>> {
    const allUsers = await this.userRepository.findAll();
    return new ResData('All Users Found', 200, allUsers);
  }

  // Find One User
  async findOne(id: number): Promise<ResData<UserEntity>> {
    const foundUser = await this.userRepository.findOne(id);
    if (!foundUser) {
      throw new UserNotFoundException();
    }
    await this.cacheManager.set(UserById.USERBYID + id, foundUser, 0);
    return new ResData('User Found', 200, foundUser);
  }

  // Find One User By Login
  async findOneByLogin(login: string): Promise<ResData<UserEntity>> {
    const foundUser = await this.userRepository.findOneByLogin(login);
    if (!foundUser) {
      throw new UserNotFoundException();
    }
    return new ResData('User Found', 200, foundUser);
  }

  async delete(id: number): Promise<ResData<UserEntity>> {
    await this.clearCache();
    await this.findOne(id);
    const deletedUser = await this.userRepository.delete(id);
    await this.cacheManager.del(UserById.USERBYID + id);
    return new ResData('User Deleted', 200, deletedUser);
  }

  async update(id: number, user: UpdateUserDto): Promise<ResData<UserEntity>> {
    await this.clearCache();
    await this.findOne(id);
    const updatedUser = await this.userRepository.update(id, user);
    await this.cacheManager.del(UserById.USERBYID + id);
    return new ResData('User Updated', 200, updatedUser);
  }

  async clearCache() {
    await this.cacheManager.del(AllUsers.ALLUSERS);
  }
}
