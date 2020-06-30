import {Quantity} from "./Quantity";

export class Item {
    private constructor(private _sku: string, private _quantity: Quantity) {
    }

    static create(sku: string, quantity: Quantity): Item {
        return new Item(sku, quantity);
    }

    get sku(): string {
        return this._sku;
    }

    get quantity(): Quantity {
        return this._quantity;
    }
}
