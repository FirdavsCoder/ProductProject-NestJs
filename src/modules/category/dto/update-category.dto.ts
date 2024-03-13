import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({
    type: String,
    description: 'Category Name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
