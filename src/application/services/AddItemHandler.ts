import {AddItemCommand} from "./AddItemCommand";
import {TransferRepository} from "../../domain/models/TransferRepository";
import {inject, injectable} from "inversify";
import {TYPES} from "../../infrastructure/di/types";
import {TransferId} from "../../domain/models/TransferId";
import {UnknownTransferException} from "./UnknownTransferException";
import {Item} from "../../domain/models/Item";
import {TransferDto} from "../dtos/TransferDto";
import {TransferStates} from "../../domain/models/Transfer";

@injectable()
export class AddItemHandler {
    constructor(@inject(TYPES.TransferRepository) private readonly repository: TransferRepository) {
    }

    async handle(command: AddItemCommand): Promise<TransferDto> {
        let transfer = await this.repository.findById(TransferId.createFromString(command.transferId));
        if (transfer == null) {
            throw new UnknownTransferException('The transfer does not exist');
        }

        transfer.addItem(Item.create(command.sku, command.quantity));
        await this.repository.save(transfer);

        return new TransferDto(transfer.id.toString(), TransferStates[transfer.state], transfer.items.length);
    }
}
