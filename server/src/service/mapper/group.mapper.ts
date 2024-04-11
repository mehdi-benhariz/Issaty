import { Group } from '../../domain/group.entity';
import { GroupDTO } from '../dto/group.dto';

/**
 * A Group mapper object.
 */
export class GroupMapper {
    static fromDTOtoEntity(entityDTO: GroupDTO): Group {
        if (!entityDTO) {
            return;
        }
        const entity = new Group();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Group): GroupDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new GroupDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
