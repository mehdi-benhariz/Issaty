import { Classroom } from '../../domain/classroom.entity';
import { ClassroomDTO } from '../dto/classroom.dto';


/**
 * A Classroom mapper object.
 */
export class ClassroomMapper {

  static fromDTOtoEntity (entityDTO: ClassroomDTO): Classroom {
    if (!entityDTO) {
      return;
    }
    let entity = new Classroom();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
        entity[field] = entityDTO[field];
    });
    return entity;

  }

  static fromEntityToDTO (entity: Classroom): ClassroomDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new ClassroomDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
        entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
