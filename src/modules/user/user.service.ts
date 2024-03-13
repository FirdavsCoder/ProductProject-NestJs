import { Injectable } from '@nestjs/common';
import { IUserService } from './interface/user.service';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { ResData } from 'src/lib/resData';
import { UserAlreadyExistException, UserNotFoundException } from './exception/user.exception';

@Injectable()
export class UserService implements IUserService {
  // Constructor
  constructor(private readonly userRepository: UserRepository){}

  // Methods

  // Create User
  async create(createUserDto: UserEntity): Promise<ResData<UserEntity>> {
    const userByLogin = await this.userRepository.findOneByLogin(createUserDto.login);
    if (userByLogin) {
      throw new UserAlreadyExistException();
    }
    const createdUser = await this.userRepository.create(createUserDto);
    return new ResData('User Created', 201, createdUser);
  }

  // Find All Users
  async findAll(): Promise<ResData<UserEntity[]>> {
    const allUsers = await this.userRepository.findAll();
    return new ResData('All Users Found', 200, allUsers)
  }

  // Find One User
  async findOne(id: number): Promise<ResData<UserEntity>> {
    const foundUser = await this.userRepository.findOne(id);
    if (!foundUser) {
      throw new UserNotFoundException();
    }
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
}
