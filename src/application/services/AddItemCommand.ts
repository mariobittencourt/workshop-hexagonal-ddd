export class AddItemCommand {
    constructor(readonly transferId: string, readonly sku: string, readonly quantity: number) {
    }
}
