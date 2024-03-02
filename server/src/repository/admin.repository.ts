import { EntityRepository, Repository } from 'typeorm';
import { Admin } from '../domain/admin.entity';

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin> {}
