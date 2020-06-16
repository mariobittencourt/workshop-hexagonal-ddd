import {Location} from "./Location";
import {InvalidRouteException} from "./InvalidRouteException";

export class Route {
    private constructor(private readonly _origin: Location, private readonly _destination: Location) {
        if (_origin.equals(_destination)) {
            throw new InvalidRouteException('The origin and destination must be different');
        }
    }

    static create(origin: Location, destination: Location): Route {
        return new Route(origin, destination);
    }

    equals(newRoute: Route) {
        return this._origin.equals(newRoute._origin) &&
            this._destination.equals(newRoute._destination);
    }

    get origin(): Location {
        return this._origin;
    }

    get destination(): Location {
        return this._destination;
    }
}
