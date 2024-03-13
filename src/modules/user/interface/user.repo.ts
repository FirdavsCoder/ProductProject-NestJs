import { UserEntity } from "../entities/user.entity";

export interface IUserRepository {
    findOne(id: number): Promise<UserEntity>;
    findAll(): Promise<UserEntity[]>;
    findOneByLogin(login: string): Promise<UserEntity>;
    create(user: UserEntity): Promise<UserEntity>;
}