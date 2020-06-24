import {AddItemCommand} from "./AddItemCommand";
import {TransferRepository} from "../../domain/models/TransferRepository";
import {inject, injectable} from "inversify";
import {TYPES} from "../../infrastructure/di/types";
import {TransferId} from "../../domain/models/TransferId";
import {UnknownTransferException} from "./UnknownTransferException";
import {AddTransferItemDto} from "../dtos/AddTransferItemDto";
import {TransferStates} from "../../domain/models/Transfer";

@injectable()
export class AddItemHandler {
    constructor(@inject(TYPES.TransferRepository) private readonly repository: TransferRepository) {
    }

    async handle(command: AddItemCommand): Promise<AddTransferItemDto> {
        let transfer = await this.repository.findById(TransferId.createFromString(command.transferId));
        if (transfer == null) {
            throw new UnknownTransferException('The transfer does not exist');
        }

        transfer.addItem(command.sku, command.quantity);
        await this.repository.save(transfer);

        return new AddTransferItemDto(transfer.id.toString(), TransferStates[transfer.state], transfer.items.length);
    }
}
