import {SetMetadata} from '@nestjs/common';

export const ROLES = 'ROLES';
export const RolesGuard = (...args: string[]) => SetMetadata(ROLES, args);
