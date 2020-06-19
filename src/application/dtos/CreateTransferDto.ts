export class CreateTransferDto {
    constructor(public readonly transferId: string, public readonly state: string) {
    }
}
