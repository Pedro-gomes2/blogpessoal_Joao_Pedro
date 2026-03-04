//Modelar Dados 

import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

//Criar a Entidade Tema --
@Entity({name:"tb_temas"})// Create table tb_temas
export class Tema{
    
    @PrimaryGeneratedColumn()// Primary key (id) Auto Increment
    id:number ;

    @Transform(({ value }: TransformFnParams) => value?.trim()) // remover  o espaço em branco no ini/fim.
    @IsNotEmpty()//Força a Digitação 
    @Column({length:100,nullable:false})// VARCHAR(100) not null
    descricao:string;
}