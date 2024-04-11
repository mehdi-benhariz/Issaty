import { EntityRepository, Repository } from 'typeorm';
import { Group } from '../domain/group.entity';

@EntityRepository(Group)
export class GroupRepository extends Repository<Group> {}
