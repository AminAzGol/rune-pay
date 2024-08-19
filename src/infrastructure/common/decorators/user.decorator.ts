import {SetMetadata} from '@nestjs/common';

export const ANY_USER = 'ANY_USER';

export const AnyUser = () => SetMetadata(ANY_USER, true);