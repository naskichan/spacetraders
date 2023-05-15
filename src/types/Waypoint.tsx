import Chart from "./Chart";
import Faction from "./Faction";
import Orbital from "./Orbital";
import Trait from "./Trait";

export default interface Waypoint {
    systemSymbol: string;
    symbol: string;
    type: string;
    x: number;
    y: number;
    orbitals: Orbital[];
    traits: Trait[];
    chart: Chart;
    faction: Faction;
}