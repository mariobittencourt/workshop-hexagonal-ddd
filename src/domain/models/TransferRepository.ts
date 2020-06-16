import {Transfer} from "./Transfer";
import {TransferId} from "./TransferId";

export interface TransferRepository {
    add(transfer: Transfer): Promise<boolean>;
    save(transfer: Transfer): Promise<boolean>;
    findById(transferId: TransferId): Promise<Transfer|null>;
    findByIdOrFail(transferId: TransferId): Promise<Transfer>;
}
