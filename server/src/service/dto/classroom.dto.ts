/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';


import { StudentDTO } from './student.dto';
import { SubjectDTO } from './subject.dto';


/**
 * A ClassroomDTO object.
 */
export class ClassroomDTO extends BaseDTO {

            @ApiModelProperty({description: 'name field', required: false})
        name: string;


         @ApiModelProperty({ type: StudentDTO, isArray: true,description: 'students relationship'})
        students: StudentDTO[];

        @ApiModelProperty({ type: SubjectDTO,description: 'subject relationship'})
        subject: SubjectDTO;

        // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

    }
