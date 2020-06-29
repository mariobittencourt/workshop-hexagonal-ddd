import {inject, injectable} from "inversify";
import {TYPES} from "../../../infrastructure/di/types";
import {PlaceTransferHandler} from "../../../application/services/PlaceTransferHandler";
import {PlaceTransferCommand} from "../../../application/services/PlaceTransferCommand";
import {BadRequestError} from "restify-errors";

@injectable()
export class PlaceTransferController {

    constructor(@inject(TYPES.PlaceTransferHandler) private handler: PlaceTransferHandler) {
    }

    async place(req, res, next) {
        try {
            const command = new PlaceTransferCommand(req.body.origin, req.body.destination);
            const dto = await this.handler.handle(command);
            res.send(dto);
        } catch (exception) {
            res.send(new BadRequestError(exception.message))
        }
        next();
    }
}
