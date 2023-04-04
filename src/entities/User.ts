import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity("users")
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column({ type: "text" })
    email: string

    @Column({ type: "text" })
    password: string

}