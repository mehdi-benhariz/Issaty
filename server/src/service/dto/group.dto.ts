/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';


import { DocumentDTO } from './document.dto';
import { StudentDTO } from './student.dto';
import { SubjectDTO } from './subject.dto';
import { MajorDTO } from './major.dto';


/**
 * A GroupDTO object.
 */
export class GroupDTO extends BaseDTO {

            @ApiModelProperty({description: 'name field', required: false})
        name: string;


        @ApiModelProperty({ type: DocumentDTO,description: 'emploi relationship'})
        emploi: DocumentDTO;

         @ApiModelProperty({ type: StudentDTO, isArray: true,description: 'students relationship'})
        students: StudentDTO[];

        @ApiModelProperty({ type: SubjectDTO,description: 'subject relationship'})
        subject: SubjectDTO;

        @ApiModelProperty({ type: DocumentDTO,description: 'document relationship'})
        document: DocumentDTO;

        @ApiModelProperty({ type: MajorDTO,description: 'major relationship'})
        major: MajorDTO;

        // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

    }
