import { PickType } from '@nestjs/swagger';
import { CreateAdminDTO } from './create-admin.dto';

export class AdminSignInDto extends PickType(CreateAdminDTO, [
  'email',
  'password',
]) {}
