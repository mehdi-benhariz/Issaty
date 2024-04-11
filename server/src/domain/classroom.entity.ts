/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Student } from './student.entity';
import { Subject } from './subject.entity';

/**
 * A Classroom.
 */
@Entity('classroom')
export class Classroom extends BaseEntity {
    @Column({ name: 'name', nullable: true })
    name: string;

    @OneToMany(
        type => Student,
        other => other.classroom,
    )
    students: Student[];

    @ManyToOne(type => Subject)
    subject: Subject;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
