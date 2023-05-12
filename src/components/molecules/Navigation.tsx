import NavType from "../../types/Nav";
import Consumption from "./Consumption";
import FlightModeSwitch from "./FlightModeSwitch";

interface Props {
    nav: NavType;
}

function Navigation(props: Props) {
    function changeFlightMode(mode: "CRUISE" | "BURN" | "DRIFT" | "STEALTH") {
        console.log(mode);
    }
    // Complex calculation :(
    const consumption = 1;
    return(
        <div className="py-4 flex flex-col justify-between gap-2">
            <div className="flex flex-row justify-between gap-2 items-center"> 
                <FlightModeSwitch onClick={changeFlightMode} selectedMode={props.nav.flightMode} />
                <Consumption consumption={consumption} />
            </div>
            <div className="flex flex-row justify-between gap-2 items-center">
                props.nav.
            </div>
        </div>
    )
}

export default Navigation;