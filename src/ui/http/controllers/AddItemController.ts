import {inject, injectable} from "inversify";
import {TYPES} from "../../../infrastructure/di/types";
import {AddItemCommand} from "../../../application/services/AddItemCommand";
import {AddItemHandler} from "../../../application/services/AddItemHandler";
import {Next, Request, Response} from "restify";
import {UnknownTransferException} from "../../../application/services/UnknownTransferException";

@injectable()
export class AddItemController {
    constructor(@inject(TYPES.AddItemHandler) private readonly handler: AddItemHandler) {
    }

    async add(req: Request, res: Response, next: Next) {
        try {
            const command = new AddItemCommand(req.params.transferId, req.body.sku, req.body.quantity);
            const dto = await this.handler.handle(command);
            res.send(dto);
        } catch (exception) {
            switch (exception.constructor) {
                case UnknownTransferException:
                    res.send(404);
                    break;
                default:
                    // In reality handle the other types, some can be 500 etc
                    res.send(400);
            }
        }
        next();
    }
}
