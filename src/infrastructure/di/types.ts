const TYPES = {
    TransferRepository: Symbol.for('TransferRepository'),

    CreateTransferHandler: Symbol.for('CreateTransferHandler'),
    CreateTransferController: Symbol.for('CreateTransferController'),

    AddItemHandler: Symbol.for('AddItemHandler'),
    AddItemController: Symbol.for('AddItemController'),

    GetTransferController: Symbol.for('GetTransferController'),
    GetTransferHandler: Symbol.for('GetTransferHandler'),

    ReleaseTransferController:Symbol.for('ReleaseTransferController'),
    ReleaseTransferHandler:Symbol.for('ReleaseTransferHandler'),
    CreateOutboundService:Symbol.for('CreateOutboundService'),
    AxiosInstance:Symbol.for('AxiosInstance'),
    HighJumpAdapter: Symbol.for('HighJumpAdapter'),
    HighJumpTranslator: Symbol.for('HighJumpTranslator'),
}

export { TYPES };
