import {CreateTransferCommand} from "./CreateTransferCommand";
import {inject, injectable} from "inversify";
import {Transfer, TransferStates} from "../../domain/models/Transfer";
import {TransferId} from "../../domain/models/TransferId";
import {TYPES} from "../../infrastructure/di/types";
import {TransferRepository} from "../../domain/models/TransferRepository";
import {CreateTransferDto} from "../dtos/CreateTransferDto";
import {Route} from "../../domain/models/Route";
import {Location} from "../../domain/models/Location";

@injectable()
export class CreateTransferHandler {
    constructor(@inject(TYPES.TransferRepository) private readonly repository: TransferRepository) {
    }

    async handle(command: CreateTransferCommand): Promise<CreateTransferDto> {
        const transfer = Transfer.place(
            TransferId.create(),
            Route.create(Location.createFromString(command.origin), Location.createFromString(command.destination)));
        await this.repository.add(transfer);
        return new CreateTransferDto(transfer.id.toString(), TransferStates[transfer.state]);
    }
}
