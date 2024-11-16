import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDTO } from './dto/create-admin.dto';
import { DataResponseDto } from '../common/dto/data-response.dto';
import { AdminSignInDto } from './dto/singin.dto';
import { OkResponse } from '../common/dto/ok-response.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('register')
  create(@Body() payload: CreateAdminDTO): Promise<DataResponseDto> {
    return this.adminService.create(payload);
  }

  @Post('signin')
  signIn(@Body() payload: AdminSignInDto): Promise<OkResponse> {
    return this.adminService.signIn(payload);
  }
}
