import {Module} from "@nestjs/common";
import {BSCExplorerService} from "./bsc-explorer.service";
import {EnvironmentConfigModule} from "../../common/config/environment_config.module";

@Module({
    imports: [EnvironmentConfigModule],
    providers: [BSCExplorerService],
    exports: [BSCExplorerService],
})
export class ExplorersModule {
}