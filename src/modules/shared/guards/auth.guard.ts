import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { UserService } from "src/modules/user/user.service";
import { JwtService } from "@nestjs/jwt";
import { config } from "src/common/config/config";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractToken(request);
        
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {secret: 'ok'});
            const {data: foundUser} = await this.userService.findOne(
                payload.id,
            );
            request.user = foundUser;
            
        }
        catch (error) {
            throw new UnauthorizedException();
        }
        return true;

    }
    private extractToken(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}