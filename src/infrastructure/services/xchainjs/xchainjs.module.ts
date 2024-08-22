import {Module} from "@nestjs/common";
import {WalletService} from "./wallet/wallet.service";
import {ChainManagerService} from "./chain/chain-manager.service";
import {EnvironmentConfigModule} from "../../common/config/environment_config.module";
import {BscClientFactory} from "./clients/bsc-client";
import {MidgardClient} from "./clients/midgard-client";

@Module({
    imports: [EnvironmentConfigModule],
    providers: [WalletService, ChainManagerService, BscClientFactory, MidgardClient],
    exports: [WalletService, ChainManagerService, MidgardClient]
})
export class XChainJsModule {
}