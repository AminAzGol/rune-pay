import {AcquisitionStateEnum} from "../enum/acquisition-state.enum";
import {BaseM} from "./base";

export class AcquisitionM extends BaseM {
    paymentId: number
    addressAssetId: number
    state: AcquisitionStateEnum
}