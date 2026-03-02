import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { PostagemService } from "../services/postagem.service";
import { Postagem } from "../entities/postagem.entity";

@Controller("/postagens")
export class PostagemController{
    constructor(
        private readonly postagemService: PostagemService // injeção de dependencia da classe postagem service

    ){}
    
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll():Promise<Postagem[]>{
        return this.postagemService.findAll();
    }
}