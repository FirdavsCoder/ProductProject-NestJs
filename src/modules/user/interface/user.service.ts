import { ResData } from "src/lib/resData";
import { UserEntity } from "../entities/user.entity";

export interface IUserService {
    create(createUserDto: UserEntity): Promise<ResData<UserEntity>>;
    findAll(): Promise<ResData<UserEntity[]>>;
    findOne(id: number): Promise<ResData<UserEntity>>;
    findOneByLogin(login: string): Promise<ResData<UserEntity>>;
}