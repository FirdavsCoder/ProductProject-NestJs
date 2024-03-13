import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @ApiProperty({type: String, description: 'Product Name'})
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({type: String, description: 'Product Description'})
    @IsString()
    description: string;

    @ApiProperty({type: Number, description: 'Product Price'})
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @ApiProperty({type: Number, description: 'Product Count'})
    @IsNotEmpty()
    @IsNumber()
    count: number;

    @ApiProperty({type: Number, description: 'Category Id'})
    @IsNotEmpty()
    @IsNumber()
    categoryId: number;


}
