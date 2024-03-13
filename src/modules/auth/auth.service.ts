import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ILoginData } from './interfaces/auth.service';
import { ResData } from 'src/lib/resData';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { LoginAlreadyUsed, LoginOrPasswordWrongException } from './exception/auth.exception';
import { JwtService } from '@nestjs/jwt';
import { BcryptHashing } from 'src/lib/bcrypt';
import { UserEntity } from '../user/entities/user.entity';
import { UserRepository } from '../user/user.repository';


@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<ResData<ILoginData>> {
    const foundUser= await this.userRepository.findOneByLogin(
      dto.login,
    );

    if (!foundUser) {
      throw new LoginOrPasswordWrongException();
    }
    const compared = await BcryptHashing.comparePassword(dto.password, foundUser.password)
    if (!compared) {
      throw new UnauthorizedException("Password or login is wrong!")
    }

    const token = await this.jwtService.signAsync({ id: foundUser.id });

    return new ResData<ILoginData>('success', HttpStatus.OK, {
      user: foundUser,
      token,
    });
  }

  async register(userRegisterDto: RegisterDto, currentUser: UserEntity): Promise<ResData<ILoginData>> {
    const foundLogin = await this.userRepository.findOneByLogin(userRegisterDto.login);
    if (foundLogin) {
      throw new LoginAlreadyUsed();
    }

    userRegisterDto.password = await BcryptHashing.hashPassword(userRegisterDto.password);
    const newUser = new UserEntity();
    newUser.fullName = userRegisterDto.fullName;
    newUser.login = userRegisterDto.login;
    newUser.password = userRegisterDto.password;
    newUser.role = userRegisterDto.role;

    const created = await this.userRepository.create(newUser);
    const token = await this.jwtService.signAsync({ id: created.id });
    return new ResData<ILoginData>('user registered successfully', 201, {
      user: created,
      token,
    });
  }
}