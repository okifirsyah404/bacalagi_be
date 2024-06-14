import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreatePostingDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  publisher: string;

  @IsNumber()
  @IsNotEmpty()
  yearPublished: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsOptional()
  imageUrl?: string; // Optional property for image URL
}
