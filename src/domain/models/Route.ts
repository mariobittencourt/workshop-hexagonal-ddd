import {Location} from "./Location";
import {InvalidRouteException} from "./InvalidRouteException";

export class Route {
    private constructor(private readonly origin: Location, private readonly destination: Location) {
        if (origin.equals(destination)) {
            throw new InvalidRouteException('The origin and destination must be different');
        }
    }

    static create(origin: Location, destination: Location): Route {
        return new Route(origin, destination);
    }

    equals(newRoute: Route) {
        return this.origin.equals(newRoute.origin) &&
            this.destination.equals(newRoute.destination);
    }
}
