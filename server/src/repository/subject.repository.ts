import { EntityRepository, Repository } from 'typeorm';
import { Subject } from '../domain/subject.entity';

@EntityRepository(Subject)
export class SubjectRepository extends Repository<Subject> {}
