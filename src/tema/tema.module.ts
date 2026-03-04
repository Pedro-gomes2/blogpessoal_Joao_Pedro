import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tema } from "./entities/tema.entity";
import { TemaService } from "./services/tema.service";
import { TemaControle } from "./controller/tema.controller";

@Module({

    imports:[TypeOrmModule.forFeature([Tema])],
    providers:[TemaService],
    controllers:[TemaControle],
    exports:[],

})
export class TemaModule{}