/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { ClassroomDTO } from './classroom.dto';

/**
 * A StudentDTO object.
 */
export class StudentDTO extends BaseDTO {
    @ApiModelProperty({ description: 'name field', required: false })
    name: string;

    @ApiModelProperty({ type: ClassroomDTO, description: 'classroom relationship' })
    classroom: ClassroomDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
