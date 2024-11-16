import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDTO } from './dto/create-admin.dto';
import { DataResponseDto } from '../common/dto/data-response.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(@Body() payload: CreateAdminDTO): Promise<DataResponseDto> {
    return this.adminService.create(payload);
  }
}
