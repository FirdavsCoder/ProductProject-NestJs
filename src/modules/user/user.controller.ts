import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { AllUsers } from '../../common/enums/enum';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(CacheInterceptor)
  @CacheKey(AllUsers.ALLUSERS)
  @CacheTTL(0)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiParam({ name: 'login', type: String })
  @Get('login/:login')
  findOneByLogin(@Param('login') login: string) {
    return this.userService.findOneByLogin(login);
  }

  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiParam({ name: 'id', type: Number })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateUserDto) {
    return this.userService.update(+id, updateDto);
  }

  @ApiParam({ name: 'id', type: Number })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(+id);
  }
}
