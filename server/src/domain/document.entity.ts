/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Teacher } from './teacher.entity';
import { Group } from './group.entity';
import { Status } from './enumeration/status';
import { DocType } from './enumeration/doc-type';
import { FileType } from './enumeration/file-type';

/**
 * A Document.
 */
@Entity('document')
export class Document extends BaseEntity {
    @Column({ type: 'simple-enum', name: 'status', enum: Status })
    status: Status;

    @Column({ type: 'simple-enum', name: 'type', enum: DocType })
    type: DocType;

    @Column({ type: 'simple-enum', name: 'file', enum: FileType })
    file: FileType;

    @Column({ name: 'url', nullable: true })
    url: string;

    @OneToOne((type) => Teacher)
    @JoinColumn()
    owner: Teacher;

    @OneToMany((type) => Group, (other) => other.document)
    toGroups: Group[];

    @ManyToOne((type) => Teacher)
    teacher: Teacher;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
