/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import { BaseEntity } from './base/base.entity';


import { Profile } from './profile.entity';
import { Demand } from './demand.entity';
import { Group } from './group.entity';

import { User } from './user.entity';

/**
 * A Student.
 */
@Entity('student')
export class Student extends BaseEntity  {


    @OneToOne(type => Profile)
@JoinColumn()    profile: Profile;

    @OneToOne(type => User)
@JoinColumn()    user: User;

    @OneToMany(type => Demand, other => other.student)
    demands: Demand[];

    @ManyToOne(type => Group)
    group: Group;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

}
