import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('transactions')
export class Transaction{
    @PrimaryColumn({type: 'bigint'})
    id : number

    @CreateDateColumn({type: 'timestamptz'})
    date : Date;

    @Column({type : 'float'})
    amount : number;

    @Column()
    currency : string;

    @Column({type : 'float'})
    client_id : number;
}