import {BaseM} from "./base";

export class ConversionRateM extends BaseM {
    currencyId: number
    assetId: number
    rate: number
    expiresAt: Date
}