import Requirements from "./Requirements";

export default interface Frame {
    symbol: string;
    name: string;
    description: string;
    moduleSlots: number;
    mountingPoints: number;
    condition: number;
    fuelCapacity: number;
    requirements: Requirements;
}