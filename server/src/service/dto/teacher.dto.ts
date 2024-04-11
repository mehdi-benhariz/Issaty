/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';


import { ProfileDTO } from './profile.dto';
import { DepartmentDTO } from './department.dto';
import { SubjectDTO } from './subject.dto';
import { Grade } from '../../domain/enumeration/grade';

import { UserDTO } from './user.dto';

/**
 * A TeacherDTO object.
 */
export class TeacherDTO extends BaseDTO {

            @ApiModelProperty({ enum: Grade,description: 'grade enum field', required: false})
        grade: Grade;

            @ApiModelProperty({description: 'isChef field', required: false})
        isChef: boolean;

            @ApiModelProperty({description: 'bureau field', required: false})
        bureau: string;


        @ApiModelProperty({ type: ProfileDTO,description: 'profile relationship'})
        profile: ProfileDTO;

        @ApiModelProperty({ type: UserDTO,description: 'user relationship'})
        user: UserDTO;

        @ApiModelProperty({ type: DepartmentDTO,description: 'chefOfDepartment relationship'})
        chefOfDepartment: DepartmentDTO;

         @ApiModelProperty({ type: SubjectDTO, isArray: true,description: 'subjects relationship'})
        subjects: SubjectDTO[];

        // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

    }
