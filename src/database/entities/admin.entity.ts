import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { UserAccountStatus } from '../../common/constants/types.enum';
import { Company } from './company.entity';

@Entity()
@Unique(['email'])
@Index(['email'])
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({
    type: 'enum',
    enum: UserAccountStatus,
    default: UserAccountStatus.PENDING,
  })
  status: UserAccountStatus;

  @Column({ nullable: false })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Company, (company) => company.admin)
  company: Company;
}
