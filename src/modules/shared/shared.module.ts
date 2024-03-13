import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [JwtModule.register({
    global: true,
    secret: 'ok',
    signOptions: { expiresIn: '1d' },
  }), TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class SharedModule {}
