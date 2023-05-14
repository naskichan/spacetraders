import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from "../atoms/Button"
import { faMoneyBill, faSearch, faSpaceShuttle } from "@fortawesome/free-solid-svg-icons"
import { Tooltip } from "react-tooltip";

interface Props {
    traderPresent: boolean;
    scanningAvailable: boolean;
    dockingAvailable: boolean;
    orbitingAvailable: boolean;
    openTraderMenu: () => void;
    open: boolean;
}

function ActionsMenu(props: Props) {
    return (
        <div className="flex flex-col gap-2">
            {props.traderPresent && (
                <>
                    <div className="flex flex-col gap-2 border-b border-onyx py-4 overflox-hidden">
                        <h2 className="text-xl font-bold">Market</h2>
                        <Button className="overflow-hidden whitespace-nowrap" color="primary" onClick={props.openTraderMenu}>
                            <FontAwesomeIcon icon={faMoneyBill} />
                            <p>Open Trader</p>
                        </Button>
                    </div>
                    <div className="flex flex-col gap-2 border-b border-onyx py-4 overflox-hidden">
                        <h2 className="text-xl font-bold">Ship Maneuver</h2>
                        <Button toolTipId='dock' className="overflow-hidden whitespace-nowrap" color="primary" disabled={!props.dockingAvailable} onClick={() => {}}>
                            <FontAwesomeIcon icon={faSpaceShuttle} />
                            <p>Dock</p>
                            <Tooltip id="dock" place="bottom" content={`${props.dockingAvailable ? 'Docks the ship to make it able to trade' : 'The ship is already docked'}`} />
                        </Button>
                        <Button toolTipId='orbit' className="overflow-hidden whitespace-nowrap" color="primary" disabled={!props.orbitingAvailable} onClick={() => {}}>
                            <FontAwesomeIcon icon={faSpaceShuttle} />
                            <p>Orbit</p>
                            <Tooltip id="orbit" place="bottom" content={`${props.orbitingAvailable ? 'Orbit the ship to make it able to scan' : 'The ship is already orbiting'}`} />
                        </Button>
                        <Button className="overflow-hidden whitespace-nowrap" toolTipId='scan' disabled={!props.scanningAvailable} color={"primary"} onClick={() => {}} >
                            <FontAwesomeIcon icon={faSearch} />
                            <p>Scan</p>
                            <Tooltip id="scan" place="bottom" content={`${props.scanningAvailable ? 'Scan the planet for resources' : 'Scanning is only possible while in orbit'}`} />
                        </Button>
                    </div>
                </>
            )}
        </div>
    )
}

export default ActionsMenu