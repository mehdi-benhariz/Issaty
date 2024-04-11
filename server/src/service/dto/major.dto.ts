/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';


import { GroupDTO } from './group.dto';


/**
 * A MajorDTO object.
 */
export class MajorDTO extends BaseDTO {

            @IsNotEmpty()
            @ApiModelProperty({description: 'name field'})
        name: string;

            @ApiModelProperty({description: 'description field', required: false})
        description: string;


         @ApiModelProperty({ type: GroupDTO, isArray: true,description: 'groups relationship'})
        groups: GroupDTO[];

        // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

    }
