export class Quantity {
    private constructor(readonly value: number) {
        if (value <= 0) {
            throw new Error('Quantity should be positive');
        }
    }

    static create(value:number): Quantity {
        return new Quantity(value);
    }

    equals(newQuantity: Quantity): boolean {
        return this.value == newQuantity.value;
    }
}
