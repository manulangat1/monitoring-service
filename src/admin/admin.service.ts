import { Injectable } from '@nestjs/common';
import { Admin } from '../database/entities/admin.entity';
import { CreateAdminDTO } from './dto/create-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
  ) {}

  /**
   *
   * @param data
   * @returns created admin
   */
  async create(data: CreateAdminDTO): Promise<Admin> {
    const admin = await this.adminRepository.create(data);
    return this.adminRepository.save(admin);
  }
}
