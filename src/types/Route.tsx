import Destination from "./Destination";

export default interface Route {
    arrival: Date;
    departure: Destination;
    destination: Destination;
}