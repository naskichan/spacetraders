import Cargo from "./Cargo";
import Crew from "./Crew";
import Engine from "./Engine";
import Frame from "./Frame";
import Fuel from "./Fuel";
import Module from "./Module";
import Mount from "./Mount";
import Nav from "./Nav";
import Reactor from "./Reactor";
import Registration from "./Registration";

export default interface Ship {
    cargo: Cargo;
    crew: Crew;
    engine: Engine;
    frame: Frame;
    fuel: Fuel;
    modules: Module[];
    mounts: Mount[];
    nav: Nav;
    reactor: Reactor;
    registration: Registration;
    symbol: string;

}