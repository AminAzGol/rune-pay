import {ClientKeystore} from "@xchainjs/xchain-bsc";

export class BaseXChainClient {

    private address: string

    constructor(private readonly client: ClientKeystore, private readonly minConfirmations: number) {
    }

    async getAddress(): Promise<string> {
        if (!this.address) {
            this.address = await this.client.getAddressAsync()
        }
        return this.address
    }

}