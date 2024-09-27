import { Type } from "class-transformer";
import { IsDate, IsInt, IsOptional, IsString } from "class-validator";

export class CreatePersonaDto {
    @IsString()
    carnetIdentidad: string;

    @IsString()
    readonly nombre: string;

    @IsString()
    readonly apellidoPaterno: string;

    @IsString()
    readonly apellidoMaterno: string;

    @IsOptional()
    @IsDate({ message: 'la fechaNacimiento debe ser de tipo Date' })
    @Type(() => Date)
    fechaNacimiento?: Date | null;

    @IsString()
    readonly celular: string;

    @IsString()
    readonly telefono: string;

    @IsString()
    readonly direccion: string;

    @IsInt()
    readonly edad: number;

    @IsString()
    readonly estadoCivil: string;

    @IsString()
    readonly profesion: string;

    @IsString()
    readonly genero: string;
}
