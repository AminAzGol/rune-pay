import {BaseClient} from "../base-client";
import {BSCChain, Client, ClientKeystore, defaultBscParams} from "@xchainjs/xchain-bsc";
import {CompatibleAsset, EtherscanProvider} from "@xchainjs/xchain-evm-providers";
import {WalletM} from "../../../../../domain/model/wallet";
import {WalletService} from "../../wallet/wallet.service";
import {XChainClientInterface} from "../../../../../domain/types/chain-manager/factories/xchain-client.interface";
import {
    XChainClientFactoryInterface
} from "../../../../../domain/types/chain-manager/factories/xchain-client-factory.interface";
import {Injectable} from "@nestjs/common";
import {
    assetAmount,
    assetFromString,
    assetToBase,
    baseAmount,
    baseToAsset,
    formatAssetAmount
} from "@xchainjs/xchain-util";
import {AssetEnum} from "../../../../../domain/enum/asset.enum";
import {DateUtils} from "../../../../common/utils/date.utils";
import {BSCExplorerService} from "../../explorers/bsc-explorer.service";
import {ExplorerTransactionType} from "../../../../../domain/types/chain-manager/explorer-transaction.type";
import {ResourceNotFoundException} from "../../../../../domain/exceptions/resource-exceptions";
import {ChainEnum} from "../../../../../domain/enum/chain.enum";
import {EnvironmentConfigService} from "../../../../common/config/environment_config.service";


export class BscClient extends BaseClient implements XChainClientInterface {
    chainName = ChainEnum.BSC
    nativeAsset = AssetEnum.BNB

    constructor(client: ClientKeystore, private readonly bscExplorerService: BSCExplorerService) {
        super(client);
    }

    async getTransactionsSince(address: string, since: Date): Promise<ExplorerTransactionType[]> {
        const size = 20
        let page = 1
        let txsFinished, tokensFinished = false
        let records: ExplorerTransactionType[] = []

        while (true) {
            const txs = await this.getTxList(address, page, size)
            if (txs.length >= size) {
                records = records.concat(txs)
                const lastOne = txs[txs.length - 1]
                if (lastOne.timestamp <= since) {
                    txsFinished = true
                }
            } else {
                records = records.concat(txs)
                txsFinished = true
            }
            const tokenTxs = await this.getTokenList(address, page, size)
            if (tokenTxs.length >= size) {
                records = records.concat(tokenTxs)
                const lastOne = tokenTxs[tokenTxs.length - 1]
                if (lastOne.timestamp < since) {
                    tokensFinished = true
                }
            } else {
                records = records.concat(tokenTxs)
                tokensFinished = true
            }
            if (tokensFinished && txsFinished) {
                break;
            }
            await DateUtils.sleep(1000)
            page++;
        }
        /* return records exactly after 'since' */
        return records.filter(o => o.timestamp >= since).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
    }

    async getTokenList(address: string, page: number, size: number): Promise<ExplorerTransactionType[]> {
        const data = await this.bscExplorerService.tokensList(address, page, size)
        return data.result.map(o => {
            return {
                assetName: o.tokenSymbol,
                contractAddress: o.contractAddress,
                hash: o.hash,
                timestamp: DateUtils.timestampToDate(o.timeStamp),
                confirmations: o.confirmations,
                from: [
                    {address: o.from, amount: this.baseAmountStrToAssetAmountStr(o.value, 18)}
                ],
                to: [
                    {address: o.to, amount: this.baseAmountStrToAssetAmountStr(o.value, 18)}
                ],
            }
        })

    }

    async getTxList(address: string, page: number, size: number): Promise<ExplorerTransactionType[]> {
        const data = await this.bscExplorerService.getTxList(address, page, size)
        return data.result.map(o => {
            return {
                assetName: this.nativeAsset,
                hash: o.hash,
                timestamp: DateUtils.timestampToDate(o.timeStamp),
                confirmations: o.confirmations,
                from: [
                    {address: o.from, amount: this.baseAmountStrToAssetAmountStr(o.value, 18)}
                ],
                to: [
                    {address: o.to, amount: this.baseAmountStrToAssetAmountStr(o.value, 18)}
                ],
            }
        })

    }


    async getBalance(address: string): Promise<any> {
        return await this.client.getBalance(address)
    }

    async transfer(assetName: string, amount: string, recipient: string): Promise<string> {
        const asset = assetFromString(this.chainName + "." + assetName) as CompatibleAsset
        if (asset === null) {
            throw new ResourceNotFoundException('Asset', {assetName}, 'asset name is not recognizable by xchain client')
        }
        const base = assetToBase(assetAmount(amount, 18))
        const fees = await this.client.estimateFeesWithGasPricesAndLimits({
            amount: base,
            asset,
            recipient
        })
        let gasPrice = fees.gasPrices.average
        const minimumGasPrice = baseAmount(2000000000)
        if (gasPrice.lt(minimumGasPrice.amount())) {
            gasPrice = minimumGasPrice
        }
        const result = await this.bscExplorerService.transfer(this.client, {
            amount: base,
            recipient,
            sender: await this.getAddress(),
            asset: asset,
            gasPrice
        })
        return result
    }

    private baseAmountStrToAssetAmountStr(value: string, decimals: number): string {
        const base = baseAmount(value, decimals)
        const assetAmount = baseToAsset(base)
        return formatAssetAmount({amount: assetAmount})
    }
}

@Injectable()
export class BscClientFactory implements XChainClientFactoryInterface {
    apiKey: string
    baseUrl: string

    constructor(private readonly walletService: WalletService, private readonly bscExplorerService: BSCExplorerService, private readonly environmentConfigService: EnvironmentConfigService) {
        const config = this.environmentConfigService.getChainsConfig().bsc
        this.apiKey = config.apiKey
        this.baseUrl = config.baseUrl
    }

    async createClient(wallet: WalletM): Promise<BscClient> {
        const phrase = await this.walletService.decryptExistingKeystore(wallet.keystore)
        defaultBscParams.dataProviders[0].mainnet = new EtherscanProvider(defaultBscParams.providers.mainnet,
            this.baseUrl,
            this.apiKey,
            BSCChain,
            defaultBscParams.gasAsset,
            defaultBscParams.gasAssetDecimals
        )
        defaultBscParams.phrase = phrase
        const client = new Client(defaultBscParams)
        return new BscClient(client, this.bscExplorerService)
    }
}