import {Container} from "inversify";
import {PlaceTransferController} from "../../ui/http/controllers/PlaceTransferController";
import {TYPES} from "./types";
import {PlaceTransferHandler} from "../../application/services/PlaceTransferHandler";
import {TransferRepository} from "../../domain/models/TransferRepository";
import {InMemoryTransferRepository} from "../domain/models/InMemoryTransferRepository";
import {AddItemController} from "../../ui/http/controllers/AddItemController";
import {AddItemHandler} from "../../application/services/AddItemHandler";
import {ReleaseTransferController} from "../../ui/http/controllers/ReleaseTransferController";
import {ReleaseTransferHandler} from "../../application/services/ReleaseTransferHandler";
import {HighJumpAdapter} from "../application/services/HighJumpAdapter";
import {HighJumpTranslator} from "../application/services/HighJumpTranslator";
import {CreateOutboundService} from "../../application/services/CreateOutboundService";
import {HighJumpService} from "../application/services/HighJumpService";
import axios, {AxiosInstance} from "axios";
import {GetTransferHandler} from "../../application/services/GetTransferHandler";
import {GetTransferController} from "../../ui/http/controllers/GetTransferController";

const kernel = new Container();
kernel.bind<TransferRepository>(TYPES.TransferRepository).to(InMemoryTransferRepository).inSingletonScope();

kernel.bind<PlaceTransferController>(TYPES.PlaceTransferController).to(PlaceTransferController);
kernel.bind<PlaceTransferHandler>(TYPES.PlaceTransferHandler).to(PlaceTransferHandler);

kernel.bind<AddItemController>(TYPES.AddItemController).to(AddItemController);
kernel.bind<AddItemHandler>(TYPES.AddItemHandler).to(AddItemHandler);

kernel.bind<GetTransferHandler>(TYPES.GetTransferHandler).to(GetTransferHandler);
kernel.bind<GetTransferController>(TYPES.GetTransferController).to(GetTransferController);

kernel.bind<ReleaseTransferController>(TYPES.ReleaseTransferController).to(ReleaseTransferController);
kernel.bind<ReleaseTransferHandler>(TYPES.ReleaseTransferHandler).to(ReleaseTransferHandler);

kernel.bind<HighJumpAdapter>(TYPES.HighJumpAdapter).to(HighJumpAdapter);
kernel.bind<HighJumpTranslator>(TYPES.HighJumpTranslator).to(HighJumpTranslator);
kernel.bind<CreateOutboundService>(TYPES.CreateOutboundService).to(HighJumpService);
kernel.bind<AxiosInstance>(TYPES.AxiosInstance).toConstantValue(
    axios.create({baseURL: 'http://localhost:8001'}));

export { kernel };
