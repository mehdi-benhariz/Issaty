/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import { BaseEntity } from './base/base.entity';


import { Subject } from './subject.entity';


/**
 * A Teacher.
 */
@Entity('teacher')
export class Teacher extends BaseEntity  {

    @Column({name: "name", nullable: true})
    name: string;

    @Column({name: "document", nullable: true})
    document: string;


    @OneToMany(type => Subject, other => other.teacher)
    subjects: Subject[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

}
