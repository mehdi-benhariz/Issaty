/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';


import { StudentDTO } from './student.dto';
import { Status } from '../../domain/enumeration/status';


/**
 * A DemandDTO object.
 */
export class DemandDTO extends BaseDTO {

            @ApiModelProperty({ enum: Status,description: 'status enum field', required: false})
        status: Status;


        @ApiModelProperty({ type: StudentDTO,description: 'student relationship'})
        student: StudentDTO;

        // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

    }
