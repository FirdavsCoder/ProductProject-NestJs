import { UserEntity } from 'src/modules/user/entities/user.entity';

export interface ILoginData {
  user: UserEntity;
  token: string;
}
