import { faArrowUpRightFromSquare, faBars, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from "react-tooltip";
import Cargo from "./Cargo";
import Navigation from "./Navigation";
import GeneralInfo from "./GeneralInfo";
import Modules from "./Modules";
import Mounts from "./Mounts";
import Button from "../atoms/Button";
import { useState } from "react";
import ActionsMenu from "./ActionsMenu";
import ShipType from "../../types/Ship";

interface Props {
    ship: ShipType;
    openTraderMenu: (waypointSymbol: string, systemSymbol: string) => void;
}

function Ship(props: Props) {
    const [collapsed, setCollapsed] = useState<boolean>(true);
    
    return (
        <div className={`
            rounded-xl
            my-8
            mx-4
            bg-jet
            ${collapsed ? 'max-w-sm' : 'max-w-2xl'}
            overflow-hidden
            flex
            flex-row
            transition-all
            ease-linear
        
        `}>
            <div className="flex flex-col w-96 p-4">
                <div className="flex flex-row justify-between items-center pb-2 border-onyx">
                    <h1 className="
                        text-2xl
                        font-bold
                    ">{props.ship.symbol}</h1>
                    <div className="flex bg-onyx rounded-xl p-3 hover:bg-neutral-600 transition cursor-pointer" onClick={() => {setCollapsed(!collapsed)}}>
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                </div>
                <span className="flex gap-2 items-center pb-2 text-neutral-300 uppercase border-b border-onyx">
                        <div className="flex flex-row gap-2 items-center select-none">
                            <p>{props.ship.frame.name} </p>
                            <FontAwesomeIcon data-tooltip-id='info' icon={faInfoCircle} style={{color: "#df2935"}} />
                            <Tooltip id="info" place="bottom" content={props.ship.frame.description} />
                        </div>
                </span>
                <Navigation consumed={props.ship.fuel.consumed} nav={props.ship.nav} />
                <GeneralInfo ship={props.ship} />
                <Cargo cargo={props.ship.cargo}/>
                <Modules modules={props.ship.modules} />
                <Mounts mounts={props.ship.mounts} />
                <div className="flex flex-row justify-around items-center pt-2">
                    <Button color={"primary"} onClick={() => {}} >
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                        <p>Show on map</p>
                    </Button>
                </div>
            </div>
                <div className={`bg-neutral-800 p-4 rounded-r-xl select-none transition-all ${collapsed ? "w-0" : "w-1/2"}`}>
                    <ActionsMenu orbitingAvailable={props.ship.nav.status !== "IN_ORBIT"} dockingAvailable={props.ship.nav.status !== "DOCKED"} scanningAvailable={props.ship.nav.status === "IN_ORBIT"} open={!collapsed} traderPresent={true} openTraderMenu={() => props.openTraderMenu(props.ship.nav.waypointSymbol, props.ship.nav.systemSymbol)} />
                </div>
        </div>
    )
}

export default Ship;