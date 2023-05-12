import { faArrowUpRightFromSquare, faBars, faInfoCircle, faShuttleSpace } from "@fortawesome/free-solid-svg-icons";
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

interface Props {
    ship: any;
}

function Ship(props: Props) {
    const [collapsed, setCollapsed] = useState<boolean>(true);
    
    return (
        <div className={`
            rounded-l-xl
            ${collapsed ? 'rounded-r-xl' : ''}
            p-4
            my-8
            mx-4
            bg-jet
            max-w-sm
            transition-all
        
        `}>
            <ActionsMenu />
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
                <Button className="flex flex-row items-center gap-2" color={"primary"} onClick={() => {}} >
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    <p>Show on map</p>
                </Button>
                <Button toolTipId='scan' disabled={props.ship.nav.status !== 'IN_ORBIT'} className="flex flex-row items-center gap-2" color={"primary"} onClick={() => {}} >
                <FontAwesomeIcon icon={faShuttleSpace} />
                    <p>Scan</p>
                    <Tooltip id="scan" place="bottom" content={`${props.ship.nav.status === 'IN_ORBIT' ? 'Scan the planet for resources' : 'Scanning is only possible while in orbit'}`} />
                </Button>
            </div>
        </div>
    )
}

export default Ship;