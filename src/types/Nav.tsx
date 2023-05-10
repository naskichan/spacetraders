import Route from "./Route";

export default interface Nav {
    flightMode: "CRUISE" | "BURN" | "DRIFT" | "STEALTH";
    route: Route;
    status: string;
    systemSymbol: string;
    waypointSymbol: string;
}