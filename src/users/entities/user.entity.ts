import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {FileEntity} from "../../files/entities/file.entity";
import {Role} from "../../enums/role.enum";
import {DefaultValuePipe} from "@nestjs/common";

@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    login: string;

    @OneToMany(() => FileEntity, file => file.user)
    files: FileEntity[];

    @Column({ default: Role.User })
    role: Role;
}
