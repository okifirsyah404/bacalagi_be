import { PartialType } from '@nestjs/swagger';
import ProfileDto from 'src/data/dto/profile.dto';

export class UpdateProfileDto extends PartialType(ProfileDto) {}
