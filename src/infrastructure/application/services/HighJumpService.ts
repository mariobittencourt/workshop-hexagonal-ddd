import {CreateOutboundService} from "../../../application/services/CreateOutboundService";
import {Transfer} from "../../../domain/models/Transfer";
import {Outbound} from "../../../domain/models/Outbound";

export class HighJumpService implements CreateOutboundService {
    create(transfer: Transfer): Promise<Outbound> {
        return Promise.resolve(undefined);
    }
}