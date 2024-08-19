import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {CryptographyService} from "../../services/cryptography/cryptography-service";
import {Reflector} from "@nestjs/core";
import {IS_PUBLIC_KEY} from "../decorators/public.decorator";
import {RoleUsecase} from "../../../usecases/role/role.usecase";
import {ResourcePreconditionFailed} from "../../../domain/exceptions/resource-exceptions";
import {ROLES} from "../decorators/roles.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly cryptographyService: CryptographyService,
        private reflector: Reflector,
        private readonly roleUsecase: RoleUsecase
    ) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        const allowedRoles = this.reflector.getAllAndOverride<string[]>(ROLES, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            // 💡 See this condition
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request['user'] = await this.cryptographyService.verify(token);
        } catch {
            throw new UnauthorizedException();
        }

        if (allowedRoles?.length > 0) {
            const shopId = this.extractShopIdFromHeader(request)
            if (!shopId) {
                throw new ResourcePreconditionFailed('Header', {shopId}, 'header shop-id is required for this path')
            }
            const roles = await this.roleUsecase.readRolesByUserIdWithShop(shopId)
            const thisShopRole = roles.find(o => o.shop?.id === shopId)
            if (allowedRoles.indexOf(thisShopRole.role) >= 0) {
                request['shop'] = thisShopRole.shop
                return true
            }
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const headers = request.headers
        if (hasAuthorization(headers)) {
            const [type, token] = headers
                .authorization?.split(' ') ?? [];
            return type === 'Bearer' ? token : undefined;
        }
        return undefined;
    }

    private extractShopIdFromHeader(request: Request): number {
        return request.headers['shop-id'] || null
    }
}

function hasAuthorization(headers: any): headers is { authorization: string } {
    return !!headers.authorization;
}