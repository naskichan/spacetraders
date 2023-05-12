import Consumed from "./Consumed";

export default interface Fuel {
    current: number;
    capacity: number;
    consumed: Consumed;
}