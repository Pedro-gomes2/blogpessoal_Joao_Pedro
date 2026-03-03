//tratar regras de negocios
// Apagar, atualizar , consultar ---Será feito aqui

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";

@Injectable()// Permite que outras classes usem esse service.
//cria funçao para inserir no bancos de dados // indica que a classe pode ser injetada em outros lugares
export class PostagemService{

    constructor(
        @InjectRepository(Postagem)//informa que queremos o repositório da entidade Postagem.“Me dá acesso à tabela Postagem”
        private postagemRepository:Repository<Postagem>,//é a classe do TypeORM que fornece métodos prontos para 
        // manipular dados no banco
    ){}

    async findAll():Promise<Postagem[]>{//Esse método retorna todas as postagens do banco.//Significa que a função vai retornar uma Promise que, quando resolvida, terá um array de objetos do tipo Postagem.
        // Select * from tb_postagens
        return await this.postagemRepository.find();

    }
    async findByid(id:number):Promise<Postagem>{
        // Select * from tb_postagens where id=?;
        const postagem = await this.postagemRepository.findOne({where:{id}})
        if (!postagem)
            throw new HttpException('Postagem não Encontrada!', HttpStatus.NOT_FOUND);
        return postagem;
    }

    async findAllByTitulo(titulo:string):Promise<Postagem[]>{
        // Select * from tb_postagens where  titulo LIKE '%?%';
        return this.postagemRepository.find({where:{titulo:ILike(`%${titulo}%`)}})
    }

    async create(postagem: Postagem): Promise<Postagem>{
        // insert into tb_postagens(titulo,texto) values(?,?);
        return await this.postagemRepository.save(postagem);
    }

    
    async update(postagem: Postagem): Promise<Postagem>{
        if(!postagem.id || postagem.id <= 0 )
            throw new HttpException("O ID da Postagem é Invalido!!",HttpStatus.BAD_REQUEST);
        await this.findByid(postagem.id);
        // update tb_postagens  set titulo= ?, texto =? , data = current_timestamp() where id = ?;            
        return await this.postagemRepository.save(postagem);
        
    }

    async delete(id:number):Promise<DeleteResult>{
        await this.findByid(id);
        // delete tb_postagens from id = ?;
        return this.postagemRepository.delete(id);


    }


}


/*Resumo mental simples

Entity → define tabela
Service → acessa dados
Controller → expõe API
Module → conecta tudo */