import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const response = context.switchToHttp().getResponse();

    if (response?.locals?.user?.email) {
      return true;
    }

    return false;
  }
}
