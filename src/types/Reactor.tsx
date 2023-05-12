import Requirements from "./Requirements";

export default interface Reactor {
    condition: number;
    description: string;
    name: string;
    powerOutput: number;
    requirements: Requirements;
    symbol: string;
}