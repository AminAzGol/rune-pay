import {CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException} from "@nestjs/common";
import {CryptographyService} from "../../services/cryptography/cryptography-service";
import {Reflector} from "@nestjs/core";
import {IS_PUBLIC_KEY} from "../decorators/public.decorator";
import {RoleUsecase} from "../../../usecases/role/role.usecase";
import {ResourcePreconditionFailed} from "../../../domain/exceptions/resource-exceptions";
import {ROLES} from "../decorators/roles.decorator";
import {JwtTokenDetails} from "../../../domain/types/auth/jwt-token-details";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly cryptographyService: CryptographyService,
        private reflector: Reflector,
        private readonly roleUsecase: RoleUsecase
    ) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        let tokenDetails: JwtTokenDetails;

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
            tokenDetails = await this.cryptographyService.verify(token);
            request['user'] = tokenDetails
        } catch {
            throw new UnauthorizedException();
        }

        if (allowedRoles?.length > 0) {
            const shopId = this.extractShopIdFromHeader(request)
            if (!shopId) {
                throw new ResourcePreconditionFailed('Header', {shopId}, 'header shop-id is required for this path')
            }
            const roles = await this.roleUsecase.readRolesByUserIdWithShop(tokenDetails.userId)
            const thisShopRole = roles.find(o => o.shop?.id === shopId)
            if (!!thisShopRole && allowedRoles.indexOf(thisShopRole.role) >= 0) {
                request['shop'] = thisShopRole.shop
                return true
            }
            throw new ForbiddenException({message: 'you do not have access to this shop'})
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
        const shopId = request.headers['shop-id'] || null
        if (typeof shopId === 'string')
            return parseInt(shopId)
        return shopId
    }
}

function hasAuthorization(headers: any): headers is { authorization: string } {
    return !!headers.authorization;
}