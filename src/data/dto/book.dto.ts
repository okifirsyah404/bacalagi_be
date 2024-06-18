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
  @IsNotEmpty()
  @IsNumber()
  buyPrice: number;

  /**
   * ISBN field.
   *
   * @decorator `@IsNotEmpty()`
   * @decorator `@IsString()`
   *
   */
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
  @IsNotEmpty()
  @IsString()
  description: string;
}
