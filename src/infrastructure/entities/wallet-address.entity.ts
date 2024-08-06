import {Column, Entity, ManyToOne} from "typeorm";
import {BaseAbstractEntity} from "./base.entity";
import {ChainEntity} from "./chain.entity";
import {WalletEntity} from "./wallet.entity";

@Entity('wallet_address')
export class WalletAddressEntity extends BaseAbstractEntity {

    @Column('integer', {nullable: false})
    walletId: number
    @Column('varchar', {nullable: false})
    address: string
    @Column('integer', {nullable: false})
    chainId: number

    @ManyToOne(() => ChainEntity)
    chain: ChainEntity

    @ManyToOne(() => WalletEntity)
    wallet: WalletEntity

    constructor() {
        super();
    }
}