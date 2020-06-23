const TYPES = {
    CreateTransferHandler: Symbol.for('CreateTransferHandler'),
    CreateTransferController: Symbol.for('CreateTransferController'),
    TransferRepository: Symbol.for('TransferRepository'),
    AddItemHandler: Symbol.for('AddItemHandler'),
    AddItemController: Symbol.for('AddItemController'),
    ReleaseTransferController:Symbol.for('ReleaseTransferController'),
    ReleaseTransferHandler:Symbol.for('ReleaseTransferHandler'),
    CreateOutboundService:Symbol.for('CreateOutboundService'),

    AxiosInstance:Symbol.for('AxiosInstance'),
    HighJumpAdapter: Symbol.for('HighJumpAdapter'),
    HighJumpTranslator: Symbol.for('HighJumpTranslator')
}

export { TYPES };
