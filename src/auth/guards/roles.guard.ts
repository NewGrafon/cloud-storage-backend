import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../decorators/auth.decorators';
import { Role } from '../../enums/role.enum';
import { ExceptionMessages } from '../../enums/messages.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const isAuth: boolean = user && requiredRoles.includes(user.role);
    console.log(isAuth);
    if (isAuth) {
      return true;
    } else {
      throw new UnauthorizedException(ExceptionMessages.Unauthorized);
    }
  }
}
