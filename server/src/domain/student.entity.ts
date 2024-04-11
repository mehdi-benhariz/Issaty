/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Classroom } from './classroom.entity';

/**
 * A Student.
 */
@Entity('student')
export class Student extends BaseEntity {
    @Column({ name: 'name', nullable: true })
    name: string;

    @ManyToOne((type) => Classroom)
    classroom: Classroom;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
