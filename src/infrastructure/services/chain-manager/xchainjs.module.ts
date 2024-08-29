import {Module} from "@nestjs/common";
import {WalletService} from "./wallet/wallet.service";
import {ChainManagerService} from "./chain-manager.service";
import {EnvironmentConfigModule} from "../../common/config/environment_config.module";
import {BscClientFactory} from "./clients/bsc/bsc-client";
import {MidgardClient} from "./clients/midgard/midgard-client";
import {ExplorersModule} from "./explorers/explorers.module";
import {BtcClientFactory} from "./clients/btc/btc-client.factory";

@Module({
    imports: [EnvironmentConfigModule, ExplorersModule],
    providers: [WalletService, ChainManagerService, BscClientFactory, MidgardClient, BtcClientFactory],
    exports: [WalletService, ChainManagerService, MidgardClient, BscClientFactory, BtcClientFactory]
})
export class XChainJsModule {
}