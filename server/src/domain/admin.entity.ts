/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import { BaseEntity } from './base/base.entity';


import { Profile } from './profile.entity';
import { AdminRole } from './enumeration/admin-role';

import { User } from './user.entity';

/**
 * A Admin.
 */
@Entity('admin')
export class Admin extends BaseEntity  {

    @Column({type: 'boolean' ,name: "is_super", nullable: true})
    isSuper: boolean;

    @Column({type: 'simple-enum', name: 'role', enum: AdminRole})
    role: AdminRole;


    @OneToOne(type => Profile)
@JoinColumn()    profile: Profile;

    @OneToOne(type => User)
@JoinColumn()    user: User;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

}
