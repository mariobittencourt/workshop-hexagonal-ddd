export class TransferItemDto {
    constructor (public readonly sku: string, public readonly quantity: number) {}
}

export class TransferDto {
    constructor(
        public readonly transferId: string,
        public readonly origin: string,
        public readonly destination: string,
        public readonly state: string,
        public readonly items: Array<TransferItemDto>) {
    }
}
