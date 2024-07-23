import {BaseM} from "./base";

export class ConversionRateM extends BaseM {
    assetId: number
    currencyId: number
    rate: number
    expiresAt: Date
}