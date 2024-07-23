import {HealthController} from "./health/health.controller";
import {Module} from "@nestjs/common";
import {UsecasesModule} from "../../usecases/usecases.module";

@Module({
    imports: [UsecasesModule],
    providers: [],
    controllers: [
        HealthController
    ],
})
export class ControllersModule {
}
