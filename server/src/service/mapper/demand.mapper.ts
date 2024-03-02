import { Demand } from '../../domain/demand.entity';
import { DemandDTO } from '../dto/demand.dto';

/**
 * A Demand mapper object.
 */
export class DemandMapper {
    static fromDTOtoEntity(entityDTO: DemandDTO): Demand {
        if (!entityDTO) {
            return;
        }
        const entity = new Demand();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Demand): DemandDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new DemandDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
