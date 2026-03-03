import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { PostagemService } from "../services/postagem.service";
import { Postagem } from "../entities/postagem.entity";


//O controller recebe requisições do usuário.
@Controller("/postagens")//Define rota base
export class PostagemController{
    constructor(//Controller → usa service para acessar o banco.
        private readonly postagemService: PostagemService // injeção de dependencia da classe postagem service

    ){}
    //Criar rota GET
    @Get()
    @HttpCode(HttpStatus.OK)//GET /postagens
    findAll():Promise<Postagem[]>{
        return this.postagemService.findAll();//Cliente → Controller → Service → Banco → retorna dados
    }

    //Criar rota GET
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findByid(@Param('id', ParseIntPipe)id:number):Promise<Postagem>{
        return  this.postagemService.findByid(id);
    }

     //Criar rota GET
    @Get('/titulo/:titulo')
    @HttpCode(HttpStatus.OK)
    findAllByTitulo(@Param('titulo')titulo:string):Promise<Postagem[]>{
        return  this.postagemService.findAllByTitulo(titulo);
    }
    

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body()postagem:Postagem):Promise<Postagem>{// @body para acessar o corpo
        return this.postagemService.create(postagem);
    }

    
    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body()postagem:Postagem):Promise<Postagem>{// @body para acessar o corpo
        return this.postagemService.update(postagem);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe)id:number){
        return  this.postagemService.delete(id);
    }



}