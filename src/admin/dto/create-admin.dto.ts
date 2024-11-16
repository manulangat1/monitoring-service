import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAdminDTO {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;
}
