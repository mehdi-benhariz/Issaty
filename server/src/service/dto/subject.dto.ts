/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { ClassroomDTO } from './classroom.dto';
import { TeacherDTO } from './teacher.dto';

/**
 * A SubjectDTO object.
 */
export class SubjectDTO extends BaseDTO {
    @ApiModelProperty({ description: 'name field', required: false })
    name: string;

    @ApiModelProperty({ type: ClassroomDTO, isArray: true, description: 'classes relationship' })
    classes: ClassroomDTO[];

    @ApiModelProperty({ type: TeacherDTO, description: 'teacher relationship' })
    teacher: TeacherDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
