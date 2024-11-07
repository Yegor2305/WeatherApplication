import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Place} from "../../place/entities/place.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @ManyToMany(() => Place, (place) => place.users)
    @JoinTable()
    places: Place[];
}
