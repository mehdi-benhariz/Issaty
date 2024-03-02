/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { TeacherDTO } from './teacher.dto';
import { GroupDTO } from './group.dto';
import { Status } from '../../domain/enumeration/status';
import { DocType } from '../../domain/enumeration/doc-type';
import { FileType } from '../../domain/enumeration/file-type';

/**
 * A DocumentDTO object.
 */
export class DocumentDTO extends BaseDTO {
    @ApiModelProperty({ enum: Status, description: 'status enum field', required: false })
    status: Status;

    @ApiModelProperty({ enum: DocType, description: 'type enum field', required: false })
    type: DocType;

    @ApiModelProperty({ enum: FileType, description: 'file enum field', required: false })
    file: FileType;

    @ApiModelProperty({ description: 'url field', required: false })
    url: string;

    @ApiModelProperty({ type: TeacherDTO, description: 'owner relationship' })
    owner: TeacherDTO;

    @ApiModelProperty({ type: GroupDTO, isArray: true, description: 'toGroups relationship' })
    toGroups: GroupDTO[];

    @ApiModelProperty({ type: TeacherDTO, description: 'teacher relationship' })
    teacher: TeacherDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
