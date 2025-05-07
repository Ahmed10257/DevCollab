import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefreshAuthGuard extends AuthGuard('refresh-jwt') {
  //   canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
  //     const request = context.switchToHttp().getRequest();
  //     const refreshToken = request.get('authorization').replace('Bearer', '').trim();
  //     if (!refreshToken) {
  //       return false;
  //     }
  //     return super.canActivate(context);
  //   }
}
