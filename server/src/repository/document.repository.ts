import { EntityRepository, Repository } from 'typeorm';
import { Document } from '../domain/document.entity';

@EntityRepository(Document)
export class DocumentRepository extends Repository<Document> {}
