import {CreateOutboundService} from "../../../application/services/CreateOutboundService";
import {Transfer} from "../../../domain/models/Transfer";
import {Outbound} from "../../../domain/models/Outbound";
import {HighJumpAdapter} from "./HighJumpAdapter";
import {inject, injectable} from "inversify";
import {TYPES} from "../../di/types";

@injectable()
export class HighJumpService implements CreateOutboundService {
    constructor(@inject(TYPES.HighJumpAdapter) private readonly adapter: HighJumpAdapter) {
    }

    async create(transfer: Transfer): Promise<Outbound> {
        return await this.adapter.createOutbound(
            transfer.route.origin.toString(),
            transfer.route.destination.toString(),
            transfer.items.map(item => {
                return {
                    code: item.sku,
                    numberOfItems: item.quantity
                }
            })
        );
    }
}
