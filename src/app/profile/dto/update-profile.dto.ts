import {
  IsOptional,
  IsString,
  IsDate,
  IsPhoneNumber,
  IsInt,
} from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  adminAreaLocality?: string;

  @IsOptional()
  @IsString()
  cityLocality?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsOptional()
  @IsDate()
  dateOfBirth?: Date;

  @IsOptional()
  @IsInt()
  age?: number;
}
