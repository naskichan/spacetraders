export const queryKeys = {
    agent: ['agent'] as const,
    ships: ['ships'] as const,
    waypoint: (symbol: string) => ['waypoint', symbol] as const,
    market: (waypointSymbol: string) => ['trader', waypointSymbol] as const,
}

//user: (id: string) => ['user', id] as const, fo later