import Requirements from "./Requirements";

export default interface Engine {
    symbol: string;
    name: string;
    description: string;
    condition: number;
    speed: number;
    requirements: Requirements;
}