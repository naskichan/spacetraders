import { faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "react-tooltip";

interface Props {
    consumption : number;
}

function Consumption(props: Props) {
    return (
        <>
            <div data-tooltip-id='cons' className="flex flex-row gap-2 items-center bg-onyx rounded-xl p-2">
                <FontAwesomeIcon icon={faFire} color="#df2935" size="xl" />
                <p className='cursor-default select-none'>{props.consumption}</p>
            </div>
            <Tooltip id='cons' place="bottom" content='Current consumption per move' />
        </>
    )
}

export default Consumption;