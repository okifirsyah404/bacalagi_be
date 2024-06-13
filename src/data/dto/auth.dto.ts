import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Transformer } from 'src/utils/transform/transformer';

export default class AuthDto {
  constructor(
    name: string,
    firebaseTokenId: string,
    phoneNumber: string,
    city: string,
    administrationArea: string,
  ) {
    this.name = name;
    this.firebaseTokenId = firebaseTokenId;
    this.phoneNumber = phoneNumber;
    this.regency = city;
    this.province = administrationArea;
  }

  /**
   *
   * Name field.
   *
   * @decorator `@IsNotEmpty()`
   * @decorator `@IsString()`
   *
   */
  @IsString({
    message: 'name must be a string',
  })
  @IsNotEmpty({
    message: 'name is required',
  })
  name: string;

  /**
   *
   * Firebase JWT token field.
   *
   * @decorator `@IsNotEmpty()`
   * @decorator `@IsString()`
   *
   */
  @IsString({
    message: 'firebaseTokenId must be a string',
  })
  @IsNotEmpty({
    message: 'firebaseTokenId is required',
  })
  firebaseTokenId: string;

  /**
   *
   * Phone number field.
   *
   * @decorator `@IsNotEmpty()`
   * @decorator `@IsString()`
   * @decorator `@IsPhoneNumber('ID')`
   *
   */
  @Transform(Transformer.toPrefixIndoensianPhoneNumber)
  @IsPhoneNumber('ID', {
    message: 'phoneNumber must be a valid Indonesian phone number',
  })
  @IsString({
    message: 'phoneNumber must be a string',
  })
  @IsNotEmpty({
    message: 'phoneNumber is required',
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
  @IsString({
    message: 'address must be a string',
  })
  @IsOptional()
  address?: string;
}
