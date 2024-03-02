/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Document } from './document.entity';
import { Student } from './student.entity';
import { Subject } from './subject.entity';
import { Major } from './major.entity';

/**
 * A Group.
 */
@Entity('jhi_group')
export class Group extends BaseEntity {
    @Column({ name: 'name', nullable: true })
    name: string;

    @OneToOne((type) => Document)
    @JoinColumn()
    emploi: Document;

    @OneToMany((type) => Student, (other) => other.group)
    students: Student[];

    @ManyToOne((type) => Subject)
    subject: Subject;

    @ManyToOne((type) => Document)
    document: Document;

    @ManyToOne((type) => Major)
    major: Major;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
