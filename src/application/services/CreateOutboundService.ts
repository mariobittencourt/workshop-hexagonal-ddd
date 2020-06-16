import {Transfer} from "../../domain/models/Transfer";
import {Outbound} from "../../domain/models/Outbound";

export interface CreateOutboundService {
    create(transfer: Transfer): Promise<Outbound>;
}