/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { ProfileDTO } from './profile.dto';
import { DemandDTO } from './demand.dto';
import { GroupDTO } from './group.dto';

import { UserDTO } from './user.dto';

/**
 * A StudentDTO object.
 */
export class StudentDTO extends BaseDTO {
    @ApiModelProperty({ type: ProfileDTO, description: 'profile relationship' })
    profile: ProfileDTO;

    @ApiModelProperty({ type: UserDTO, description: 'user relationship' })
    user: UserDTO;

    @ApiModelProperty({ type: DemandDTO, isArray: true, description: 'demands relationship' })
    demands: DemandDTO[];

    @ApiModelProperty({ type: GroupDTO, description: 'group relationship' })
    group: GroupDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
