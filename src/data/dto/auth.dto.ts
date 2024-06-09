import { Transform } from 'class-transformer';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { Transformer } from 'src/utils/transform/transformer';

export default class AuthDto {
  constructor(
    firebaseTokenId: string,
    phoneNumber: string,
    city: string,
    administrationArea: string,
    address: string,
  ) {
    this.firebaseTokenId = firebaseTokenId;
    this.phoneNumber = phoneNumber;
    this.city = city;
    this.administrationArea = administrationArea;
    this.address = address;
  }

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
    message: 'city must be a string',
  })
  @IsNotEmpty({
    message: 'city is required',
  })
  city: string;

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
  administrationArea: string;

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
  @IsNotEmpty({
    message: 'address is required',
  })
  address: string;
}
