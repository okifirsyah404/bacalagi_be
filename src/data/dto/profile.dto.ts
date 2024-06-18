import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transformer } from 'src/utils/transform/transformer';

export default class ProfileDto {
  constructor(
    name: string,
    phoneNumber: string,
    city: string,
    administrationArea: string,
    address: string,
  ) {
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.regency = city;
    this.province = administrationArea;
    this.address = address;
  }

  /**
   *
   * Name field.
   *
   * @decorator `@IsNotEmpty()`
   * @decorator `@IsString()`
   *
   */
  @ApiProperty({
    example: 'John Doe',
  })
  @IsString({
    message: 'name must be a string',
  })
  @IsNotEmpty({
    message: 'name is required',
  })
  name: string;

  /**
   *
   * Phone number field.
   *
   * @decorator `@IsNotEmpty()`
   * @decorator `@IsString()`
   * @decorator `@IsPhoneNumber('ID')`
   *
   */
  @ApiProperty({
    example: '081234567890',
    maxLength: 13,
    minLength: 11,
  })
  @Transform(Transformer.toPrefixIndoensianPhoneNumber)
  @IsPhoneNumber('ID', {
    message: 'phone Number must be a valid Indonesian phone number',
  })
  @MaxLength(15, {
    message: 'phone Number must be at most 15 characters',
  })
  @MinLength(13, {
    message: 'phone Number must be at least 13 characters',
  })
  @IsString({
    message: 'phone Number must be a string',
  })
  @IsNotEmpty({
    message: 'phoneN umber is required',
  })
  phoneNumber: string;

  /**
   *
   * City field.
   *
   * @decorator `@IsNotEmpty()`
   * @decorator `@IsString()`
   *
   */
  @ApiProperty({
    example: 'Surabaya',
  })
  @IsString({
    message: 'regency must be a string',
  })
  @IsNotEmpty({
    message: 'regency is required',
  })
  regency: string;

  /**
   *
   * Administration Area / Province field.
   *
   * @decorator `@IsNotEmpty()`
   * @decorator `@IsString()`
   *
   */
  @ApiProperty({
    example: 'Jawa Timur',
  })
  @IsString({
    message: 'province must be a string',
  })
  @IsNotEmpty({
    message: 'province is required',
  })
  province: string;

  /**
   *
   * Address field.
   *
   * @decorator `@IsNotEmpty()`
   * @decorator `@IsString()`
   *
   */
  @ApiProperty({
    example: 'Surabaya',
  })
  @IsString({
    message: 'address must be a string',
  })
  @IsNotEmpty({
    message: 'address is required',
  })
  address: string;
}
