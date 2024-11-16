import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from '../database/entities/company.entity';
import { Repository } from 'typeorm';
import { Admin } from '../database/entities/admin.entity';
@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
  ) {}
  /**
   * @data - name - this is the name of the company
   * returns the newly created company
   */
  async create(name: string, admin?: Admin): Promise<any> {
    // TODO: come back and research on this
    // const company = await this.companyRepository
    //   .createQueryBuilder()
    //   .insert()
    //   .into(Company)
    //   .values({
    //     name,
    //     ...(admin && admin),
    //   })
    //   .returning('*')
    //   .execute();
    const company = await this.companyRepository.create({
      name,
      ...(admin && admin),
    });
    await this.companyRepository.save(company);
    return company;
  }
}
