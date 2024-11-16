import { Exclude, Expose } from 'class-transformer';

export class AdminResponseDto {
  @Expose()
  email: string;

  // due to security reasons,exclude the password from the response
  @Exclude()
  password: string;
}
