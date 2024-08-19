import {Module} from "@nestjs/common";
import {WalletService} from "./wallet/wallet.service";
import {ChainManagerService} from "./chain/chain-manager.service";
import {EnvironmentConfigModule} from "../../common/config/environment_config.module";
import {BscClientFactory} from "./clients/bsc-client";

@Module({
    imports: [EnvironmentConfigModule],
    providers: [WalletService, ChainManagerService, BscClientFactory],
    exports: [WalletService, ChainManagerService]
})
export class XChainJsModule {
}