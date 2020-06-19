import {TransferId} from "./TransferId";
import {Item} from "./Item";
import {InvalidTransferException} from "./InvalidTransferException";
import {Route} from "./Route";

export enum TransferStates {
    DRAFT,
    RELEASE_PENDING,
    RELEASED
}

export class Transfer {
    private _state: TransferStates;
    private _items: Array<Item>;
    private _confirmationId: string;

    private constructor(private readonly _id: TransferId, private _route: Route) {
        this._state = TransferStates.DRAFT;
        this._items = new Array<Item>();
    }

    static place(id: TransferId, route: Route): Transfer {
        return new Transfer(id, route);
    }

    addItem(item: Item): void {
        this._items.push(item);
    }

    release(): void {
        if (this.items.length < 1) {
            throw new InvalidTransferException('You can only release a transfer with at least one item');
        }

        if (this.state != TransferStates.DRAFT) {
            throw new InvalidTransferException('You can only begin a release if transfer is in draft state');
        }

        this._state = TransferStates.RELEASE_PENDING;

    }

    completeRelease(confirmationId: string): void {
        if (this.state != TransferStates.RELEASE_PENDING) {
            throw new InvalidTransferException('You can only confirm releases that are in pending state');
        }

        this._confirmationId = confirmationId;
        this._state = TransferStates.RELEASED;
    }

    get state(): TransferStates {
        return this._state;
    }

    get id(): TransferId {
        return this._id;
    }

    get route(): Route {
        return this._route;
    }

    get items(): Array<Item> {
        return this._items;
    }

    get confirmationId(): string {
        return this._confirmationId;
    }
}
