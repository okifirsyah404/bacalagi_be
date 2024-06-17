import { PickType } from '@nestjs/swagger';
import ProfileDto from 'src/data/dto/profile.dto';

export class UpdateProfileDto extends PickType(ProfileDto, [
  'name',
  'phoneNumber',
  'regency',
  'province',
  'address',
]) {}
