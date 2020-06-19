import { v4 as uuid } from 'uuid';

export class TransferId {
    private readonly value: string;

    private constructor(value: string) {
        this.value = value;
    }

    static create(): TransferId {
        return new TransferId(uuid());
    }

    static createFromString(value: string): TransferId {
        return new TransferId(value);
    }

    equals(newId: TransferId): boolean {
        return this.value == newId.value;
    }

    toString(): string {
        return this.value;
    }
}
