import { Admin } from '../../domain/admin.entity';
import { AdminDTO } from '../dto/admin.dto';

/**
 * A Admin mapper object.
 */
export class AdminMapper {
    static fromDTOtoEntity(entityDTO: AdminDTO): Admin {
        if (!entityDTO) {
            return;
        }
        const entity = new Admin();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Admin): AdminDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new AdminDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
