// import { UUID } from 'crypto';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  //   PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Admin } from './admin.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  //   @PrimaryColumn('uuid')
  //   companyId: UUID;

  @Column({ nullable: false })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Admin, (admin) => admin.company)
  admin: Admin[];
}
