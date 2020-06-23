import {Outbound} from "../../../domain/models/Outbound";
import {HighJumpOutbound} from "./HighJumpOutbound";

export class HighJumpTranslator {
    translate(outboundData: HighJumpOutbound): Outbound {
        return Outbound.create(outboundData.response_id, parseInt(outboundData.status, 10));
    }
}
