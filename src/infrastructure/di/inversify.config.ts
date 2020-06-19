import {Container} from "inversify";
import {CreateTransferController} from "../../ui/http/controllers/CreateTransferController";
import {TYPES} from "./types";
import {CreateTransferHandler} from "../../application/services/CreateTransferHandler";
import {TransferRepository} from "../../domain/models/TransferRepository";
import {InMemoryTransferRepository} from "../domain/models/InMemoryTransferRepository";
import {AddItemController} from "../../ui/http/controllers/AddItemController";
import {AddItemHandler} from "../../application/services/AddItemHandler";

const kernel = new Container();
kernel.bind<TransferRepository>(TYPES.TransferRepository).to(InMemoryTransferRepository).inSingletonScope();

kernel.bind<CreateTransferController>(TYPES.CreateTransferController).to(CreateTransferController);
kernel.bind<CreateTransferHandler>(TYPES.CreateTransferHandler).to(CreateTransferHandler);

kernel.bind<AddItemController>(TYPES.AddItemController).to(AddItemController);
kernel.bind<AddItemHandler>(TYPES.AddItemHandler).to(AddItemHandler);

export { kernel };
