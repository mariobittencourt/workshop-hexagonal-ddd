import "reflect-metadata";
import * as restify from 'restify';
import {kernel} from "./src/infrastructure/di/inversify.config";
import {TYPES} from "./src/infrastructure/di/types";
import {AddItemController} from "./src/ui/http/controllers/AddItemController";
import {ReleaseTransferController} from "./src/ui/http/controllers/ReleaseTransferController";
import {GetTransferController} from "./src/ui/http/controllers/GetTransferController";
import {CreateTransferController} from "./src/ui/http/controllers/CreateTransferController";
import {v4 as uuid} from "uuid";

let server = restify.createServer();
server.use(restify.plugins.bodyParser({ mapParams: false }));

server.listen(8000, () => {
    console.log('%s listening at %s for your requests...', server.name, server.url);
});

const createTransferController = kernel.get<CreateTransferController>(TYPES.CreateTransferController);
server.post('/transfers', (req, res, next) => {
    createTransferController.create(req, res, next);
});

const addItemController = kernel.get<AddItemController>(TYPES.AddItemController);
server.post('/transfers/:transferId/items', (req, res, next) => {
    addItemController.add(req, res, next);
});

const getTransferController = kernel.get<GetTransferController>(TYPES.GetTransferController);
server.get('/transfers/:transferId', (req, res, next) => {
    getTransferController.get(req, res, next);
});

const releaseTransferController = kernel.get<ReleaseTransferController>(TYPES.ReleaseTransferController);
server.post('/transfers/:transferId/release', (req, res, next) => {
    releaseTransferController.release(req, res, next);
});

// My fake warehouse server
let warehouseServer = restify.createServer();
warehouseServer.use(restify.plugins.bodyParser({ mapParams: false }));

warehouseServer.listen(8001, () => {
    console.log('Warehouse => %s listening at %s for your requests...', warehouseServer.name, warehouseServer.url);
});

// My fake warehouse system
warehouseServer.post('/outbound', (req, res, next) => {
    console.log('Request received', req.body);
    res.send({
        response_id: uuid(),
        status: 'Processed'
    });
    next();
});
