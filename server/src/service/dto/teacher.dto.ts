/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { SubjectDTO } from './subject.dto';

/**
 * A TeacherDTO object.
 */
export class TeacherDTO extends BaseDTO {
    @ApiModelProperty({ description: 'name field', required: false })
    name: string;

    @ApiModelProperty({ description: 'document field', required: false })
    document: string;

    @ApiModelProperty({ type: SubjectDTO, isArray: true, description: 'subjects relationship' })
    subjects: SubjectDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
