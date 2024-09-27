import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'personas', schema: 'public' })
export class Persona {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    carnetIdentidad: string;

    @Column()
    nombre: string;

    @Column({ nullable: true })
    apellidoPaterno: string;

    @Column({ nullable: true })
    apellidoMaterno: string;

    @Column({ nullable: true })
    fechaNacimiento: Date;

    @Column()
    celular: string;
    
    @Column()
    telefono: string;

    @Column()
    direccion: string;

    @Column()
    edad: number;

    @Column({ nullable: true })
    estadoCivil: string;

    @Column()
    profesion: string;

    @Column()
    genero: string;

    @Column()
    estado: boolean;
}
