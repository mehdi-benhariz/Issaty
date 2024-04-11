import { Document } from '../../domain/document.entity';
import { DocumentDTO } from '../dto/document.dto';


/**
 * A Document mapper object.
 */
export class DocumentMapper {

  static fromDTOtoEntity (entityDTO: DocumentDTO): Document {
    if (!entityDTO) {
      return;
    }
    let entity = new Document();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
        entity[field] = entityDTO[field];
    });
    return entity;

  }

  static fromEntityToDTO (entity: Document): DocumentDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new DocumentDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
        entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
