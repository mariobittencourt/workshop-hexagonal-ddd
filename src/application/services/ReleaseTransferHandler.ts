import {inject, injectable} from "inversify";
import {TYPES} from "../../infrastructure/di/types";
import {TransferRepository} from "../../domain/models/TransferRepository";
import {CreateOutboundService} from "./CreateOutboundService";
import {ReleaseTransferCommand} from "./ReleaseTransferCommand";

@injectable()
export class ReleaseTransferHandler {
    constructor(@inject(TYPES.TransferRepository) private readonly repository: TransferRepository,
                @inject(TYPES.CreateOutboundService) private readonly outboundService: CreateOutboundService) {
    }

    async handle(command: ReleaseTransferCommand): Promise<boolean> {
        return Promise.resolve(true);
    }
}