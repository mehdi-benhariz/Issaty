/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A Profile.
 */
@Entity('profile')
export class Profile extends BaseEntity {
    @Column({ name: 'first_name' })
    firstName: string;

    @Column({ name: 'last_name' })
    lastName: string;

    @Column({ type: 'datetime', name: 'birth_date', nullable: true })
    birthDate: any;

    @Column({ name: 'address', nullable: true })
    address: string;

    @Column({ name: 'profile_pic', nullable: true })
    profilePic: string;

    @Column({ name: 'email', nullable: true })
    email: string;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
