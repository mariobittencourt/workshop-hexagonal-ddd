import {Outbound, OutboundState} from "../../../domain/models/Outbound";
import {HighJumpOutbound} from "./HighJumpOutbound";
import {InvalidOutboundStateException} from "../../../domain/models/InvalidOutboundStateException";
import {injectable} from "inversify";

@injectable()
export class HighJumpTranslator {
    translate(outboundData: HighJumpOutbound): Outbound {
        // Validate and have proper exception throwing...
        return Outbound.create(outboundData.response_id, this.convertStatusToState(outboundData.status));
    }

    private convertStatusToState(status: string): number {
        // The remote context may have different definitions than our bounded context
        switch (status.toLowerCase()) {
            case 'pending':
                return OutboundState.PENDING;
            case 'processed':
                return OutboundState.PROCESSED;
            default:
                throw new InvalidOutboundStateException('Unknown state. Sorry you are on your own');
        }
    }
}
