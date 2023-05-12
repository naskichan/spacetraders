import { faBoltLightning, faBox, faGaugeHigh } from "@fortawesome/free-solid-svg-icons";
import ConditionBar from "../atoms/ConditionBar";
import InfoChip from "../atoms/InfoChip";

interface Props {
    ship: any;
}

function GeneralInfo(props: Props) {
    return (
        <div className="flex gap-3 py-4 justify-between flex-wrap select-none">
            <ConditionBar type="health" label="Hull" value={props.ship.frame.condition} maxValue={100}/>
            <ConditionBar type="health" label="Engine" value={props.ship.engine.condition} maxValue={100} />
            <ConditionBar full type="fuel" label="Fuel" value={props.ship.fuel.current} maxValue={props.ship.fuel.capacity} />
            <div className="flex gap-5 px-1 flex-wrap">
                <InfoChip toolTipId='speed' icon={faGaugeHigh} value={`${props.ship.engine.speed}`} toolTipText="The current max speed of the ship" color="#EAB308" />
                <InfoChip toolTipId='power' icon={faBoltLightning} value={`${props.ship.reactor.powerOutput}`} toolTipText="The current output of the ships generator" color="#EAB308" />
                <InfoChip toolTipId='capacity' icon={faBox} value={`${props.ship.cargo.capacity}`} toolTipText="The maximum cargo capacity of the ship" color="#EAB308" />
                <InfoChip toolTipId='module' icon={faBox} value={`${props.ship.frame.moduleSlots}`} toolTipText="The ships total module slots" color="#EAB308" />
                <InfoChip toolTipId='mounting' icon={faBox} value={`${props.ship.frame.mountingPoints}`} toolTipText="The ships total mounting points" color="#EAB308" />
            </div>
        </div>
    )
}

export default GeneralInfo;