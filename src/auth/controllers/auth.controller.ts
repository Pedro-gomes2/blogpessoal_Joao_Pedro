import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { AuthService } from '../services/auth.service';
import { UsuarioLogin } from '../entities/usuariologin.entities';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Usuario')
@Controller("/usuarios")
export class AuthController {
    constructor(private authService: AuthService) { }//AuthService é injetado no construtor para ser usado nos métodos.

    @UseGuards(LocalAuthGuard)//é um guard que valida credenciais de login (usuário/senha).
    @HttpCode(HttpStatus.OK)
    @Post('/logar')
    login(@Body() usuario: UsuarioLogin): Promise<any> {
        return this.authService.login(usuario);
    }

}