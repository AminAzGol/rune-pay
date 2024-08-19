import {SetMetadata} from '@nestjs/common';

export const ROLES = 'ROLES';
export const Roles = (...args: string[]) => SetMetadata(ROLES, args);
