import {ClientKeystore} from "@xchainjs/xchain-bsc";

export class BaseClient {

    private address: string

    constructor(protected readonly client: ClientKeystore) {
    }

    async getAddress(): Promise<string> {
        if (!this.address) {
            this.address = await this.client.getAddressAsync()
        }
        return this.address
    }

}