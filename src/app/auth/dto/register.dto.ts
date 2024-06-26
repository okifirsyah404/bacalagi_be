import { PickType } from '@nestjs/swagger';
import AuthDto from 'src/data/dto/auth.dto';

export class RegisterDto extends PickType(AuthDto, [
  'name',
  'firebaseTokenId',
  'phoneNumber',
  'regency',
  'province',
  'address',
]) {}
