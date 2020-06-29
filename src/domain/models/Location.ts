import {Locations} from "./Locations";
import {InvalidLocationException} from "./InvalidLocationException";

export class Location {
    private constructor(private readonly value: string) {
        if (!(value in Locations)) {
            throw new InvalidLocationException(value + ' is not a valid location');
        }
    }

    static createFromString(value: string): Location {
        return new Location(value);
    }

    equals(newLocation: Location): boolean {
        return this.value == newLocation.value;
    }

    toString(): string {
        return this.value;
    }
}
