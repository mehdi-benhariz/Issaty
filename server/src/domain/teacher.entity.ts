/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Profile } from './profile.entity';
import { Department } from './department.entity';
import { Subject } from './subject.entity';
import { Grade } from './enumeration/grade';

import { User } from './user.entity';

/**
 * A Teacher.
 */
@Entity('teacher')
export class Teacher extends BaseEntity {
    @Column({ type: 'simple-enum', name: 'grade', enum: Grade })
    grade: Grade;

    @Column({ type: 'boolean', name: 'is_chef', nullable: true })
    isChef: boolean;

    @Column({ name: 'bureau', nullable: true })
    bureau: string;

    @OneToOne((type) => Profile)
    @JoinColumn()
    profile: Profile;

    @OneToOne((type) => User)
    @JoinColumn()
    user: User;

    @OneToOne((type) => Department)
    @JoinColumn()
    chefOfDepartment: Department;

    @OneToMany((type) => Subject, (other) => other.teacher)
    subjects: Subject[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
