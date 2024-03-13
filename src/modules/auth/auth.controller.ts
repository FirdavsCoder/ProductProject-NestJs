import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { CurrentUser } from './decorator/currentUser';
import { UserEntity } from '../user/entities/user.entity';



@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }


  @ApiBadRequestResponse({description: "Bad Request"})
  @ApiCreatedResponse({description: "Created"})
  @Post('register')
  async register(@Body() registerDto: RegisterDto, @CurrentUser() currentUser : UserEntity) {
    return await this.authService.register(registerDto, currentUser);
  }
}


