import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
    Logger,
  } from '@nestjs/common';
  import { Request } from 'express';
  
  @Injectable()
  export class AdminGuard implements CanActivate {
    private readonly logger = new Logger(AdminGuard.name);
  
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest<Request>();
      const user = request.user;
  
      this.logger.log('Checking admin role for user: ' + JSON.stringify(user));
  
      if (!user || !user.roles || !user.roles.some(role => role.value === 'ADMIN')) {
        this.logger.warn('Access denied - User is not admin');
        throw new UnauthorizedException('Only admin can access this resource');
      }
  
      return true;
    }
  }
  