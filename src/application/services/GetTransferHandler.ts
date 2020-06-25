import {TransferDto, TransferItemDto} from "../dtos/TransferDto";
import {GetTransferQuery} from "./GetTransferQuery";
import {inject, injectable} from "inversify";
import {TYPES} from "../../infrastructure/di/types";
import {TransferRepository} from "../../domain/models/TransferRepository";
import {TransferId} from "../../domain/models/TransferId";
import {TransferStates} from "../../domain/models/Transfer";
import {Locations} from "../../domain/models/Locations";

@injectable()
export class GetTransferHandler {
    constructor(@inject(TYPES.TransferRepository) private readonly repository: TransferRepository) {
    }

    async handle(query: GetTransferQuery): Promise<TransferDto> {
        const transfer = await this.repository.findByIdOrFail(TransferId.createFromString(query.transferId));
        return new TransferDto(
            transfer.id.toString(),
            transfer.route.origin.toString(),
            transfer.route.destination.toString(),
            TransferStates[transfer.state],
            transfer.items.map(item => new TransferItemDto(item.sku, item.quantity)));
    }
}
