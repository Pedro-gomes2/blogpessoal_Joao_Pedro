import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tema } from "../../tema/entities/tema.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";

//modelar  dados

//cria entidade postagem --cria uma tabela no banco de dados
@Entity({name:"tb_postagens"})//create table tb_postagens 
export class Postagem{
    @PrimaryGeneratedColumn()// PRIMARY KEY(ID) AUTO INCREMENT
    id:number ;
    
    @Transform(({value}: TransformFnParams)=> value?.trim())// remover  o espaço em branco no ini/fim.
    @IsNotEmpty()//força digitação // ate aqui é a validação de dados
    @Column({length:100,nullable:false})// varchar(100) not null // caracteristicas para a coluna do banco de dados 
    titulo:string;

    @Transform(({value}: TransformFnParams)=> value?.trim())// remover  o espaço em branco no ini/fim.
    @IsNotEmpty({message:"O Texto é Obrigatório"})//força digitação // ate aqui é a validação de dados
    @Length(10,1000,{message:"O Texto deve ter entre 10 e 1000 caracteres"})
    @Column({length:1000,nullable:false})// varchar(1000) not null // caracteristicas para a coluna do banco de dados 
    texto:string;


    @UpdateDateColumn()// atualiza a data 
    data:Date;

    // lado n -- n postagens associada a um tema 
    @ManyToOne(()=>Tema,(tema)=>tema.postagem,{
        onDelete:"CASCADE"// for excluído, todas as Postagens associadas a ele também serão automaticamente removidas do banco de dados
    })
    tema:Tema;

    @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
        onDelete: "CASCADE"
    })
    usuario: Usuario

}