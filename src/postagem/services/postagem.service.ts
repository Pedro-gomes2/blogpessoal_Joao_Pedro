import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";

@Injectable()// cria funçao para inserir no bancos de dados // indica que a classe pode ser injetada em outros lugares
export class PostagemService{

    constructor(
        @InjectRepository(Postagem)// injeta o repositório da entidade Postagem
        private postagemRepository:Repository<Postagem>,
    ){}

    async findAll():Promise<Postagem[]>{
        // Select * from tb_postagens
        return await this.postagemRepository.find();

    }


}