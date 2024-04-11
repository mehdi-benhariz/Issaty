/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';


import { ProfileDTO } from './profile.dto';
import { AdminRole } from '../../domain/enumeration/admin-role';

import { UserDTO } from './user.dto';

/**
 * A AdminDTO object.
 */
export class AdminDTO extends BaseDTO {

            @ApiModelProperty({description: 'isSuper field', required: false})
        isSuper: boolean;

            @ApiModelProperty({ enum: AdminRole,description: 'role enum field', required: false})
        role: AdminRole;


        @ApiModelProperty({ type: ProfileDTO,description: 'profile relationship'})
        profile: ProfileDTO;

        @ApiModelProperty({ type: UserDTO,description: 'user relationship'})
        user: UserDTO;

        // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

    }
