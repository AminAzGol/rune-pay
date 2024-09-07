import axios from "axios";
import {EnvironmentConfigService} from "../../../common/config/environment_config.service";
import {Injectable} from "@nestjs/common";
import * as assert from "node:assert";
import {ExternalResourceException} from "../../../../domain/exceptions/resource-exceptions";
import {ClientKeystore} from "@xchainjs/xchain-bsc";
import {BaseAmount} from "@xchainjs/xchain-util";
import {CompatibleAsset} from "@xchainjs/xchain-evm-providers";

@Injectable()
export class BSCExplorerService {
    baseUrl: string;
    apiKey: string;

    constructor(private readonly environmentConfigService: EnvironmentConfigService) {
        const config = this.environmentConfigService.getChainsConfig()
        assert(config.bsc.apiKey !== undefined, 'bsc.apiKey is not provided')
        assert(config.bsc.baseUrl != undefined, 'bsc.baseUrl is not provided')
        this.baseUrl = config.bsc.baseUrl
        this.apiKey = config.bsc.apiKey
    }

    async getTxList(address, page, size) {
        try {
            const res = await axios.get(`${this.baseUrl}/api`, {
                params: {
                    module: 'account',
                    action: 'txlist',
                    address,
                    page,
                    offset: size,
                    sort: 'desc',
                    apiKey: this.apiKey,
                }
            })
            return res.data
        } catch (error) {
            throw new ExternalResourceException('BSCExplorerService.getTxList', error);
        }
    }

    async tokensList(address: string, page: number, size: number) {
        try {
            const res = await axios.get(`${this.baseUrl}/api`, {
                params: {
                    module: 'account',
                    action: 'tokentx',
                    address,
                    page,
                    offset: size,
                    sort: 'desc',
                    apiKey: this.apiKey,
                }
            })
            return res.data
        } catch (error) {
            throw new ExternalResourceException('BSCExplorerService.getTxList', error);
        }
    }

    async transfer(client: ClientKeystore, txDetails: {
        amount: BaseAmount,
        recipient: string,
        sender: string,
        asset: CompatibleAsset,
        gasPrice: BaseAmount
    }): Promise<string> {
        try {
            return await client.transfer(txDetails)
        } catch (e) {
            throw new ExternalResourceException('BSCExplorer.transfer', e)
        }
    }
}