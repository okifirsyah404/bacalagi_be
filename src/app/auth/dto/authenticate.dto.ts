import { PickType } from '@nestjs/swagger';
import AuthDto from 'src/data/dto/auth.dto';

export class AuthenticateDto extends PickType(AuthDto, ['firebaseTokenId']) {}
