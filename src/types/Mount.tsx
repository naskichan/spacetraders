import Requirements from "./Requirements";

export default interface Mount {
    description: string;
    strength: number;
    symbol: string;
    name: string;
    requirements: Requirements;
}