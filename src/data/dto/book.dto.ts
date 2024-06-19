import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BookDto {
  constructor(
    title: string,
    author: string,
    publisher: string,
    publishYear: number,
    buyPrice: number,
    ISBN: string,
    language: string,
    description: string,
  ) {
    this.title = title;
    this.author = author;
    this.publisher = publisher;
    this.publishYear = publishYear;
    this.buyPrice = buyPrice;
    this.ISBN = ISBN;
    this.language = language;
    this.description = description;
  }

  /**
   * Title field.
   *
   * @decorator `@IsNotEmpty()`
   * @decorator `@IsString()`
   *
   */
  @ApiProperty({
    type: 'string',
    example: 'The Great Gatsby',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  /**
   * Author field.
   *
   * @decorator `@IsNotEmpty()`
   * @decorator `@IsString()`
   *
   */
  @ApiProperty({
    type: 'string',
    example: 'F. Scott Fitzgerald',
  })
  @IsNotEmpty()
  @IsString()
  author: string;

  /**
   * Publisher field.
   *
   * @decorator `@IsNotEmpty()`
   * @decorator `@IsString()`
   *
   */
  @ApiProperty({
    type: 'string',
    example: 'Scribner',
  })
  @IsNotEmpty()
  @IsString()
  publisher: string;

  /**
   * Publish year field.
   *
   * @decorator `@IsNotEmpty()`
   * @decorator `@IsNumber()`
   *
   */
  @ApiProperty({
    type: 'number',
    example: 1925,
  })
  @IsNotEmpty()
  @IsNumber()
  publishYear: number;

  /**
   * Buy price field.
   *
   * @decorator `@IsNotEmpty()`
   * @decorator `@IsNumber()`
   *
   */
  @ApiProperty({
    type: 'number',
    example: 120000,
  })
  @IsNotEmpty()
  @IsNumber()
  buyPrice: number;

  /**
   * Buy price field.
   *
   * @decorator `@IsNotEmpty()`
   * @decorator `@IsNumber()`
   *
   */
  @ApiProperty({
    type: 'number',
    example: 120000,
  })
  @IsNotEmpty()
  @IsNumber()
  finalPrice: number;

  /**
   * ISBN field.
   *
   * @decorator `@IsNotEmpty()`
   * @decorator `@IsString()`
   *
   */
  @ApiProperty({
    type: 'string',
    example: '978-3-16-148410-0',
  })
  @IsNotEmpty()
  @IsString()
  ISBN: string;

  /**
   * Language field.
   *
   * @decorator `@IsNotEmpty()`
   * @decorator `@IsString()`
   *
   */
  @ApiProperty({
    type: 'string',
    example: 'English',
  })
  @IsNotEmpty()
  @IsString()
  language: string;

  /**
   * Description field.
   *
   * @decorator `@IsNotEmpty()`
   * @decorator `@IsString()`
   *
   */
  @ApiProperty({
    type: 'string',
    example:
      'The Great Gatsby is a novel written by American author F. Scott Fitzgerald that follows a cast of characters living in the fictional towns of West Egg and East Egg on prosperous Long Island in the summer of 1922.',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
