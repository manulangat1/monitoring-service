import { BadRequestException, Injectable } from '@nestjs/common';
import { Admin } from '../database/entities/admin.entity';
import { CreateAdminDTO } from './dto/create-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, FindOneOptions, Repository } from 'typeorm';
import * as argon from 'argon2';
import { _400 } from '../common/constants/error-messages';
import { dataResponse, DataResponseDto } from '../common/dto/data-response.dto';
import { plainToInstance } from 'class-transformer';
import { AdminResponseDto } from './dto/admin.response.dto';
import { CompanyService } from '../company/company.service';
@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    private companyService: CompanyService,
    // use dataSource to call  make transactions
    private dataSource: DataSource,
    private entityManager: EntityManager,
  ) {}

  async findOne(options: FindOneOptions<Admin>): Promise<Admin> {
    const admin = await this.adminRepository.findOne(options);
    if (!admin) throw new BadRequestException(_400.ADMIN_NOT_FOUND);
    return admin;
  }
  /**
   *
   * @param data
   * @returns created admin
   */
  async create(payload: CreateAdminDTO): Promise<DataResponseDto> {
    //  create the company first, should all this be wrapped in a transaction?

    // check whether admin exists
    const { email, password, companyName, name } = payload;
    const adminExist = await this.adminRepository.findOne({
      where: {
        email,
      },
    });

    // wrap this in a transaction, it should rollback if any step below this line fails

    const admin = await this.dataSource.transaction(async () => {
      const company = await this.companyService.create(companyName);

      if (adminExist) throw new BadRequestException(_400.ADMIN_EXISTS);

      const hashPassword = await argon.hash(password);

      // save the admin
      const admin = await this.adminRepository.create({
        email,
        password: hashPassword,
        company,
        name,
      });
      return this.adminRepository.save(admin);
    });

    return dataResponse(plainToInstance(AdminResponseDto, admin));
  }
}
