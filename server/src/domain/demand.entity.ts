/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Student } from './student.entity';
import { Status } from './enumeration/status';

/**
 * A Demand.
 */
@Entity('demand')
export class Demand extends BaseEntity {
    @Column({ type: 'simple-enum', name: 'status', enum: Status })
    status: Status;

    @ManyToOne((type) => Student)
    student: Student;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
