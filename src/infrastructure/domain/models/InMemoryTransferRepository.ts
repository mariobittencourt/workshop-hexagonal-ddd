import {TransferRepository} from "../../../domain/models/TransferRepository";
import {Transfer} from "../../../domain/models/Transfer";
import {TransferId} from "../../../domain/models/TransferId";
import {injectable} from "inversify";

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
        return Promise.resolve(true);
    }
}
