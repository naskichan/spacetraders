import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Consumed from "../../types/Consumed";
import NavType from "../../types/Nav";
import Consumption from "./Consumption";
import FlightModeSwitch from "./FlightModeSwitch";
import { faAnchor, faShuttleSpace, } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface Props {
    nav: NavType;
    consumed: Consumed;
}

enum DestinationLabel {
    "PLANET" = "Planet",
    "GAS_GIANT" = "Gas Giant",
    "MOON" = "Moon",
    "ORBITAL_STATION" = "Orbital Station",
    "JUMP_GATE" = "Jump Gate",
    "ASTERIOD_FIELD" = "Asteroid Field",
    "NEBULA" = "Nebula",
    "DEBRIS_FIELD" = "Debris Field",
    "GRAVITY_WELL" = "Gravity Well",
}

function Navigation(props: Props) {
    // Making a refresh interval? Maybe a button with useEffect, adding a boolean to the use effect dependency array?
    const offsetSeconds = new Date().getTime() - new Date(props.nav.route.arrival).getTime();
    const offsetMinutes = Math.floor(offsetSeconds / 1000 / 60);
    const navigate = useNavigate();
    function changeFlightMode(mode: "CRUISE" | "BURN" | "DRIFT" | "STEALTH") {
        console.log(mode);
    }
    const shipStatusIcon = determineShipStatusIcon();
    function determineShipStatusIcon() {
        switch (props.nav.status) {
            case "DOCKED":
                return faAnchor as IconProp;
            case "IN_TRANSIT":
                return faShuttleSpace as IconProp;
            case "IN_ORBIT":
                return faShuttleSpace as IconProp;
            default:
                return faAnchor as IconProp;
        }
    }
    return(
        <div className="py-4 flex flex-col justify-between gap-2">
            <div className="flex flex-row justify-between gap-2 items-center"> 
                <FlightModeSwitch onClick={changeFlightMode} selectedMode={props.nav.flightMode} />
                <Consumption consumed={props.consumed} />
            </div>
                <div className="flex flex-row gap-2 items-center mt-2 select-none">
                    <div className="flex flex-row gap-2 items-center">
                        <div className="rounded-xl px-2.5 py-2 bg-onyx">
                            <FontAwesomeIcon icon={shipStatusIcon} />
                        </div>
                        {props.nav.status === "DOCKED" || props.nav.status === "IN_ORBIT" ? (
                            <>
                                <p>{props.nav.status === "DOCKED" ? "Docked at" : "Orbiting"} {DestinationLabel[props.nav.route.destination.type]}</p>
                                <a className="text-picton-blue underline cursor-pointer" onClick={() => navigate(`/planet/${props.nav.waypointSymbol}`)}>{props.nav.waypointSymbol}</a>
                            </>
                        ) : (
                            <>
                                <p>Travelling to {DestinationLabel[props.nav.route.destination.type]}</p>
                                <p>Arriving in ${offsetMinutes > 0 ? offsetMinutes + " minutes" : offsetSeconds + " seconds" }</p>
                            </>
                        )}
                    </div>
                </div>
        </div>
    )
}

export default Navigation;

/*
useQuery(queryKeys.waypoint(props.nav.waypointSymbol), fetchWaypoint(props.nav.waypointSymbol))
*/