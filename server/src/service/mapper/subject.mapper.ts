import { Subject } from '../../domain/subject.entity';
import { SubjectDTO } from '../dto/subject.dto';

/**
 * A Subject mapper object.
 */
export class SubjectMapper {
    static fromDTOtoEntity(entityDTO: SubjectDTO): Subject {
        if (!entityDTO) {
            return;
        }
        const entity = new Subject();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Subject): SubjectDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new SubjectDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
