import {inject, injectable} from "inversify";
import {TYPES} from "../../infrastructure/di/types";
import {TransferRepository} from "../../domain/models/TransferRepository";
import {CreateOutboundService} from "./CreateOutboundService";
import {ReleaseTransferCommand} from "./ReleaseTransferCommand";
import {TransferId} from "../../domain/models/TransferId";
import {UnknownTransferException} from "./UnknownTransferException";

@injectable()
export class ReleaseTransferHandler {
    constructor(@inject(TYPES.TransferRepository) private readonly repository: TransferRepository,
                @inject(TYPES.CreateOutboundService) private readonly outboundService: CreateOutboundService) {
    }

    async handle(command: ReleaseTransferCommand): Promise<boolean> {
        try {
            let transfer = await this.repository.findByIdOrFail(TransferId.createFromString(command.transferId));
            transfer.release();
            const outbound = await this.outboundService.create(transfer);
            transfer.completeRelease(outbound);
            await this.repository.save(transfer);
            return Promise.resolve(true);
        } catch (exception) {
            // Maybe I care about some exceptions to do something or in this case just rethrowing
            throw exception;
        }
    }
}
