import {HealthController} from "./health/health.controller";
import {Module} from "@nestjs/common";
import {UsecasesModule} from "../../usecases/usecases.module";
import {UserController} from "./user/user.controller";

@Module({
    imports: [UsecasesModule],
    providers: [],
    controllers: [
        HealthController,
        UserController
    ],
})
export class ControllersModule {
}
