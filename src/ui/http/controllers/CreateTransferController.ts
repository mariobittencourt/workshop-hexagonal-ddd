import {inject, injectable} from "inversify";
import {TYPES} from "../../../infrastructure/di/types";
import {CreateTransferHandler} from "../../../application/services/CreateTransferHandler";
import {CreateTransferCommand} from "../../../application/services/CreateTransferCommand";
import {BadRequestError} from "restify-errors";

@injectable()
export class CreateTransferController {

    constructor(@inject(TYPES.CreateTransferHandler) private handler: CreateTransferHandler) {
    }

    async create(req, res, next) {
        try {
            const command = new CreateTransferCommand(req.body.origin, req.body.destination);
            const dto = await this.handler.handle(command);
            res.send(dto);
        } catch (exception) {
            res.send(new BadRequestError(exception.message))
        }
        next();
    }
}
