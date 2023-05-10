import Requirements from "./Requirements";

export default interface Module {
    symbol: string;
    name: string;
    description: string;
    capacity: number;
    requirements: Requirements;
} 