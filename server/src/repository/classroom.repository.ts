import { EntityRepository, Repository } from 'typeorm';
import { Classroom } from '../domain/classroom.entity';

@EntityRepository(Classroom)
export class ClassroomRepository extends Repository<Classroom> {}
