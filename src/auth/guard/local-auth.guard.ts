import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
//criar guard de autenticação local
//
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}