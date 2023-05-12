export default interface Destination {
    symbol: string;
    type: "PLANET" | "GAS_GIANT" | "MOON" | "ORBITAL_STATION" | "JUMP_GATE" | "ASTERIOD_FIELD" | "NEBULA" | "DEBRIS_FIELD" | "GRAVITY_WELL";
    systemSymbol: string;
    x: number;
    y: number;
}