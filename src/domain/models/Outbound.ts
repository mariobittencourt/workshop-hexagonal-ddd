export enum OutboundState {
    PROCESSED,
    PENDING
}

export class Outbound {
    private constructor(readonly confirmationId: string, state: OutboundState) {
        // Do whatever validation is needed
    }

    static create(confirmationId: string, state: OutboundState): Outbound {
        return new Outbound(confirmationId, state);
    }
}