import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import{Observable} from "rxjs";
import { ROLES_KEY } from "./roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate{
 constructor(private jwtService: JwtService,
     private reflector: Reflector){

 }

 canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
   
    try {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [context.getHandler(), context.getClass()])
        if (!requiredRoles){
            return true;
        }
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new UnauthorizedException({ message: "Користувач не авторизований" });
        }

        const [bearer, token] = authHeader.split(' ');

        if (bearer !== 'Bearer' || !token) {
            throw new UnauthorizedException({ message: "Користувач не авторизований" });
        }

        const user = this.jwtService.verify(token);
        req.user = user;
        return user.roles.some(role => requiredRoles.includes(role.value));
    } catch (e) {
        throw new HttpException( 'Немає доступу', HttpStatus.FORBIDDEN);
    }
}

}