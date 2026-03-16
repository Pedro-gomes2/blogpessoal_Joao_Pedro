//Modelar Dados 

import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";
import { ApiProperty } from "@nestjs/swagger";

//Criar a Entidade Tema --
@Entity({name:"tb_temas"})// Create table tb_temas
export class Tema{
    
    @PrimaryGeneratedColumn()// Primary key (id) Auto Increment
    @ApiProperty()
    id:number ;

    @Transform(({ value }: TransformFnParams) => value?.trim()) // remover  o espaço em branco no ini/fim.
    @IsNotEmpty({message:"A Descrição é Obrigatória"})//Força a Digitação 
    @Length(5,255,{message:"A Descrição deve ter entre 10 e 1000 caracteres"})
    @Column({length:100,nullable:false})// VARCHAR(100) not null
    @ApiProperty()
    descricao:string;
    
    
    //lado 1-- 1 tema pode ter varias postagem 
    @ApiProperty()
    @OneToMany(()=>Postagem,(postagem)=>postagem.tema)
    postagem:Postagem[];


}