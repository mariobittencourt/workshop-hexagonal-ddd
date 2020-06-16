export class Item {
    private constructor(private _sku: string, private _quantity: number) {
    }

    static create(sku: string, quantity: number): Item {
        return new Item(sku, quantity);
    }

    get sku(): string {
        return this._sku;
    }

    get quantity(): number {
        return this._quantity;
    }
}
