import {Module} from "@nestjs/common";
import {BSCExplorerService} from "./bsc-explorer.service";
import {EnvironmentConfigModule} from "../../../common/config/environment_config.module";
import {BtcExplorerService} from "./btc-explorer.service";

@Module({
    imports: [EnvironmentConfigModule],
    providers: [BSCExplorerService, BtcExplorerService],
    exports: [BSCExplorerService, BtcExplorerService],
})
export class ExplorersModule {
}