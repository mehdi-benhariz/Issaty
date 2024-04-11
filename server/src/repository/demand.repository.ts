import { EntityRepository, Repository } from 'typeorm';
import { Demand } from '../domain/demand.entity';

@EntityRepository(Demand)
export class DemandRepository extends Repository<Demand> {}
