export class AddTransferItemDto {
    constructor(public readonly transferId: string, public readonly state: string, public readonly numberOfItems:number) {
    }
}
