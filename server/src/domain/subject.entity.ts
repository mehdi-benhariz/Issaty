/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Classroom } from './classroom.entity';
import { Teacher } from './teacher.entity';

/**
 * A Subject.
 */
@Entity('subject')
export class Subject extends BaseEntity {
    @Column({ name: 'name', nullable: true })
    name: string;

    @OneToMany(
        type => Classroom,
        other => other.subject,
    )
    classes: Classroom[];

    @ManyToOne(type => Teacher)
    teacher: Teacher;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
