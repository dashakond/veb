import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtMiddleware {
  private readonly logger = new Logger(JwtMiddleware.name);

  use(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers['authorization']?.split(' ')[1];
     

    if (!token) {
      this.logger.warn('No token provided');
      throw new UnauthorizedException('Token is missing');
    }

    const secretKey = 'secret_key_safasf';


    if (!secretKey) {
      this.logger.warn('JWT_SECRET is missing in environment variables');
      throw new UnauthorizedException('JWT_SECRET is missing in environment variables');
    }

    try {
      const decoded = jwt.verify(token, secretKey) as { roles: Array<{ value: string }> };
      this.logger.log('Decoded token: ' + JSON.stringify(decoded));  

     
      if (!decoded.roles?.some(role => role.value === 'ADMIN')) {
        this.logger.warn('User is not admin');
        throw new UnauthorizedException('Only admin can perform this action');
      }

      req.user = decoded;  
      this.logger.log('User added to request: ' + JSON.stringify(req.user));  

      next();
    } catch (error) {
      this.logger.error('Token is invalid or expired', error.stack);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
