import { Major } from '../../domain/major.entity';
import { MajorDTO } from '../dto/major.dto';


/**
 * A Major mapper object.
 */
export class MajorMapper {

  static fromDTOtoEntity (entityDTO: MajorDTO): Major {
    if (!entityDTO) {
      return;
    }
    let entity = new Major();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
        entity[field] = entityDTO[field];
    });
    return entity;

  }

  static fromEntityToDTO (entity: Major): MajorDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new MajorDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
        entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
