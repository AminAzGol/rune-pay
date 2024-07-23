import {Module} from '@nestjs/common';
import {ExceptionsService} from './exceptions.service';

@Module({
    providers: [{provide: 'EXCEPTIONS', useClass: ExceptionsService}],
    exports: ['EXCEPTIONS'],
})
export class ExceptionsModule {
}
