import {Next, Request, Response} from "restify";
import {inject, injectable} from "inversify";
import {TYPES} from "../../../infrastructure/di/types";
import {ReleaseTransferHandler} from "../../../application/services/ReleaseTransferHandler";
import {ReleaseTransferCommand} from "../../../application/services/ReleaseTransferCommand";
import {BadRequestError} from "restify-errors";

@injectable()
export class ReleaseTransferController {
    constructor(@inject(TYPES.ReleaseTransferHandler) private readonly handler: ReleaseTransferHandler) {
    }

    async release(req: Request, res: Response, next: Next) {
        const command = new ReleaseTransferCommand(req.params.transferId);
        try {
            const response = await this.handler.handle(command);
            res.send(response);
        } catch (exception) {
            // Add proper exception handling as different exceptions could lead to different errors to be
            // sent back
            return next(new BadRequestError(exception.message));
        }
        return next();
    }
}
