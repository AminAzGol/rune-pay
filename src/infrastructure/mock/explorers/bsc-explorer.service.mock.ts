export class BSCExplorerServiceMock {
    constructor() {
    }

    async getTxList(address, page, size) {
        return {
            status: '1',
            message: 'OK',
            result: [
                {
                    blockNumber: '41667509',
                    blockHash: '0x34db314c22756889cce4903ac1574f9a4ede2445283ba850db5fa07633321b8a',
                    timeStamp: '1724575298',
                    hash: '0x986b42e6553e5c96a0e5228a779d9984b843394a4966463d69a118ead231cdbb',
                    nonce: '54',
                    transactionIndex: '97',
                    from: '0xfaac1dd86e1ee1cdb435aaa0a50db3de64f811e2',
                    to: '0xc5cff65443507076fa488e5231bc8d7280343103',
                    value: '174035267100585',
                    gas: '21000',
                    gasPrice: '1000000000',
                    input: '0x',
                    methodId: '0x',
                    functionName: '',
                    contractAddress: '',
                    cumulativeGasUsed: '9349070',
                    txreceipt_status: '1',
                    gasUsed: '21000',
                    confirmations: '70771',
                    isError: '0'
                }
            ]
        }
    }

    async tokensList(address: string, page: number, size: number) {

        return {
            status: '1',
            message: 'OK',
            result: [
                {
                    blockNumber: '41674914',
                    timeStamp: '1724597598',
                    hash: '0xcc1024b5276221631705e5fcaa3afb4e7c74635d8093bcf06d9dcd74dcf47e07',
                    nonce: '57',
                    blockHash: '0x4b661f0a25d028f85d6241ff3c3bcbba0db927fa9d1ef3f6ce0050e234c85a02',
                    from: '0xfaac1dd86e1ee1cdb435aaa0a50db3de64f811e2',
                    contractAddress: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
                    to: '0xc5cff65443507076fa488e5231bc8d7280343103',
                    value: '10000000000000000',
                    tokenName: 'Binance-Peg BUSD Token',
                    tokenSymbol: 'BUSD',
                    tokenDecimal: '18',
                    transactionIndex: '87',
                    gas: '77386',
                    gasPrice: '1000000000',
                    gasUsed: '51591',
                    cumulativeGasUsed: '12402066',
                    input: 'deprecated',
                    confirmations: '63235'
                },
                {
                    blockNumber: '41674907',
                    timeStamp: '1724597577',
                    hash: '0x950432f43f73f5f486b2badbab56ae9614fc9a3f4e7b1701d9a6e7a8666e6916',
                    nonce: '56',
                    blockHash: '0xb3e6b577f0f39ef416e4aa90461fe728a7c02bf63277b84f0f366eac1ac2d4a2',
                    from: '0xfaac1dd86e1ee1cdb435aaa0a50db3de64f811e2',
                    contractAddress: '0x55d398326f99059ff775485246999027b3197955',
                    to: '0xc5cff65443507076fa488e5231bc8d7280343103',
                    value: '571069298120979319',
                    tokenName: 'Binance-Peg BSC-USD',
                    tokenSymbol: 'BSC-USD',
                    tokenDecimal: '18',
                    transactionIndex: '65',
                    gas: '77440',
                    gasPrice: '1000000000',
                    gasUsed: '46827',
                    cumulativeGasUsed: '6546353',
                    input: 'deprecated',
                    confirmations: '63242'
                }
            ]
        }
    }
}