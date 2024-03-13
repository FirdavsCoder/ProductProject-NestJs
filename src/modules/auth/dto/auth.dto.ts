import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { RoleEnum } from "src/common/enums/enum";


export class LoginDto {
    @ApiProperty({type: String, description: 'User Login'})
    @IsString()
    @IsNotEmpty()
    login: string;

    @ApiProperty({type: String, description: 'User Password'})
    @IsString()
    @IsNotEmpty()
    password: string;
}


export class RegisterDto {
    @ApiProperty({type: String, description: 'User Full Name'})
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @ApiProperty({type: String, description: 'User Login'})
    @IsString()
    @IsNotEmpty()
    login: string;

    @ApiProperty({type: String, description: 'User Password'})
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({type: String, description: 'User Role'})
    @IsString()
    @IsNotEmpty()
    role: RoleEnum;
}
