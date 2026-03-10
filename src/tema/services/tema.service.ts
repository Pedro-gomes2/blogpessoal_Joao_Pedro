import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tema } from "../entities/tema.entity";
import { ILike, Repository } from "typeorm";
import { promises } from "dns";
import { DeleteResult } from "typeorm/browser";

@Injectable()//Permite que outras Classes usem esse service--- Indica que a classe pode ser injetada em outro lugares
export class TemaService {

    constructor(
        @InjectRepository(Tema)// "Me dé Acesso a tabela tema"
        private temaRepository: Repository<Tema>,
    ) { }

    async findAll(): Promise<Tema[]> {
        return await this.temaRepository.find({
            relations: {
                postagem: true
            }
        });
    }

    async findById(id: number): Promise<Tema> {
        const tema = await this.temaRepository.findOne({
            where: { id },
            relations: {
                postagem: true
            }
        });
        if (!tema) {// se o tema nao existir 
            throw new HttpException("Tema não Encontrado!", HttpStatus.NOT_FOUND);
        }
        return tema;
    }
    async findByDescricao(descricao: string): Promise<Tema[]> {
        return this.temaRepository.find({
            where: { descricao: ILike(`%${descricao}%`),
            },
            relations: {
                postagem: true
            }
        });

    }

    async create(tema: Tema): Promise<Tema> {
        return await this.temaRepository.save(tema);

    }

    async update(descricao): Promise<Tema> {
        if (!descricao.id || descricao.id <= 0)// se o id da descrição nao existir ou menor/igual a 0
            throw new HttpException("O ID do Tema não Encontrado!", HttpStatus.NOT_FOUND);
        await this.findById(descricao.id);

        return await this.temaRepository.save(descricao);

    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id);
        return this.temaRepository.delete(id);
    }



}