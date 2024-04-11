import { EntityRepository, Repository } from 'typeorm';
import { Major } from '../domain/major.entity';

@EntityRepository(Major)
export class MajorRepository extends Repository<Major> {}
