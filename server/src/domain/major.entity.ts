/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import { BaseEntity } from './base/base.entity';


import { Group } from './group.entity';


/**
 * A Major.
 */
@Entity('major')
export class Major extends BaseEntity  {


    @Column({name: "name" })
    name: string;

    @Column({name: "description", nullable: true})
    description: string;


    @OneToMany(type => Group, other => other.major)
    groups: Group[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

}
