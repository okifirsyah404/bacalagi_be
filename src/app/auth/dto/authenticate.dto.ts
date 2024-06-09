import { PickType } from '@nestjs/mapped-types';
import AuthDto from 'src/data/dto/auth.dto';

export class AuthenticateDto extends PickType(AuthDto, ['firebaseTokenId']) {}
