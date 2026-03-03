import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Postagem } from "./entities/postagem.entity";
import { PostagemService } from './services/postagem.service';
import { PostagemController } from './controllers/postagem.controllers';


@Module({
    imports:[TypeOrmModule.forFeature([Postagem])],//"Dentro deste módulo, quero disponibilizar o repositório da entidade Postagem para que eu possa injetá-lo e manipular os dados dessa tabela."
    providers:[PostagemService],//prover um serviço--É a chave usada para registrar serviços (ou outros providers) que estarão disponíveis dentro do módulo.
    controllers:[PostagemController],
    exports:[],
})
export class PostagemModule{}














/*Cliente faz GET /postagens
        ↓
Controller recebe
        ↓
Controller chama Service
        ↓
Service usa Repository
        ↓
Repository consulta banco
        ↓
Dados retornam */