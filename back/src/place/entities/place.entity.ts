import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../user/entities/user.entity";

@Entity()
export class Place {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => User, (user) => user.places)
    users: User[];
}
