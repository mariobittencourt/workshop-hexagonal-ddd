import {Next, Request, Response} from "restify";
import {inject, injectable} from "inversify";
import {GetTransferQuery} from "../../../application/services/GetTransferQuery";
import {TYPES} from "../../../infrastructure/di/types";
import {GetTransferHandler} from "../../../application/services/GetTransferHandler";
import {UnknownTransferException} from "../../../application/services/UnknownTransferException";
import {NotFoundError} from "restify-errors";

@injectable()
export class GetTransferController {
    constructor(@inject(TYPES.GetTransferHandler) private readonly handler: GetTransferHandler) {
    }

    async get(req: Request, res: Response, next: Next) {
        try {
            const query = new GetTransferQuery(req.params.transferId);
            const transferDto = await this.handler.handle(query);
            res.send(transferDto);
        } catch (exception) {
            if (exception instanceof UnknownTransferException) {
                return next(new NotFoundError());
            }
            // Do something else...
        }
        return next();
    }
}