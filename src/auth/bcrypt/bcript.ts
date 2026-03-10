//define uma classe de serviço em NestJS para lidar com senhas usando o bcrypt

import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()//, o NestJS pode instanciá-la e injetá-la em outros serviços/controladores.
export class Bcrypt{

    async criptografarSenha(senha: string): Promise<string> {// transforma a senha em hash seguro antes de salvar no banco.

        let saltos: number = 10;
        return await bcrypt.hash(senha, saltos)

    }

    async compararSenhas(senhaDigitada: string, senhaBanco: string): Promise<boolean> {// verifica se a senha digitada corresponde ao hash armazenado.
        return await bcrypt.compare(senhaDigitada, senhaBanco);
    }

}