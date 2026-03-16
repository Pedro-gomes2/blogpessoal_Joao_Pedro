import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
//validação de endpoint protegidos
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}