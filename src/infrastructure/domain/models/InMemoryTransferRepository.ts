import {TransferRepository} from "../../../domain/models/TransferRepository";
import {Transfer} from "../../../domain/models/Transfer";
import {TransferId} from "../../../domain/models/TransferId";
import {injectable} from "inversify";
import {UnknownTransferException} from "../../../application/services/UnknownTransferException";

@injectable()
export class InMemoryTransferRepository implements TransferRepository {
    private items: Map<string, Transfer>;

    constructor() {
        this.items = new Map<string, Transfer>();
    }

    add(transfer: Transfer): Promise<boolean> {
        this.items.set(transfer.id.toString(), transfer);
        return Promise.resolve(true);
    }

    findById(transferId: TransferId): Promise<Transfer | null> {
        return Promise.resolve(this.items.get(transferId.toString()));
    }

    save(transfer: Transfer): Promise<boolean> {
        this.items.set(transfer.id.toString(), transfer);
        return Promise.resolve(true);
    }

    findByIdOrFail(transferId: TransferId): Promise<Transfer> {
        const item = this.items.get(transferId.toString());
        if (item == undefined) {
            throw new UnknownTransferException('Unknown transfer');
        }

        return Promise.resolve(item);
    }
}
