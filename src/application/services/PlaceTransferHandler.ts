import {PlaceTransferCommand} from "./PlaceTransferCommand";
import {inject, injectable} from "inversify";
import {Transfer, TransferStates} from "../../domain/models/Transfer";
import {TransferId} from "../../domain/models/TransferId";
import {TYPES} from "../../infrastructure/di/types";
import {TransferRepository} from "../../domain/models/TransferRepository";
import {PlaceTransferDto} from "../dtos/PlaceTransferDto";
import {Route} from "../../domain/models/Route";
import {Location} from "../../domain/models/Location";

@injectable()
export class PlaceTransferHandler {
    constructor(@inject(TYPES.TransferRepository) private readonly repository: TransferRepository) {
    }

    async handle(command: PlaceTransferCommand): Promise<PlaceTransferDto> {
        const origin = Location.createFromString(command.origin);
        const destination = Location.createFromString(command.destination);
        const transfer = Transfer.place(
            TransferId.create(),
            Route.create(origin, destination));
        await this.repository.add(transfer);
        return new PlaceTransferDto(transfer.id.toString(), TransferStates[transfer.state]);
    }
}
