/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

/**
 * A ProfileDTO object.
 */
export class ProfileDTO extends BaseDTO {
    @IsNotEmpty()
    @ApiModelProperty({ description: 'firstName field' })
    firstName: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'lastName field' })
    lastName: string;

    @ApiModelProperty({ description: 'birthDate field', required: false })
    birthDate: any;

    @ApiModelProperty({ description: 'address field', required: false })
    address: string;

    @ApiModelProperty({ description: 'profilePic field', required: false })
    profilePic: string;

    @ApiModelProperty({ description: 'email field', required: false })
    email: string;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
