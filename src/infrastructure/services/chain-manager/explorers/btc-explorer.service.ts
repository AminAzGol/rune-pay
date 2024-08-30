import {EnvironmentConfigService} from "../../../common/config/environment_config.service";
import axios from "axios";
import {ExternalResourceException} from "../../../../domain/exceptions/resource-exceptions";
import {Injectable} from "@nestjs/common";

@Injectable()
export class BtcExplorerService {
    baseUrl: string;

    constructor(private readonly environmentConfigService: EnvironmentConfigService) {
        const config = environmentConfigService.getChainsConfig().btc
        this.baseUrl = config.baseUrl
    }

    async getTxList(address: string, afterTxId?: string) {
        try {
            const res = await axios.get(`${this.baseUrl}/address/${address}/txs`, {
                params: {
                    after_txid: afterTxId
                }
            })
            return res.data
        } catch (e) {
            throw new ExternalResourceException('BtcExplorerService.getTxList', e)
        }
    }

    async getBlockHeight(): Promise<number> {
        try {
            const res = await axios.get(`${this.baseUrl}/blocks/tip/height`)
            if (typeof res.data === 'string') {
                return parseInt(res.data)
            } else if (typeof res.data === 'number') {
                return res.data
            } else {
                throw new Error('expected string or number, got: ' + typeof res.data)
            }
        } catch (e) {
            throw new ExternalResourceException('BtcExplorerService.getBlockHeight', e)
        }
    }
}