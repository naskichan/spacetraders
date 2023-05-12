import { faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "react-tooltip";
import Consumed from "../../types/Consumed";

interface Props {
    consumed : Consumed;
}


function Consumption(props: Props) {
    const offsetSeconds = new Date().getTime() - new Date(props.consumed.timestamp).getTime();
    const offsetMinutes = Math.floor(offsetSeconds / 1000 / 60);
    const offsetHours = Math.floor(offsetMinutes / 60);
    return (
        <>
            <div data-tooltip-id='cons' className="flex flex-row gap-2 items-center bg-onyx rounded-xl p-2">
                <FontAwesomeIcon icon={faFire} color="#df2935" size="xl" />
                <p className='cursor-default select-none'>{props.consumed.amount}</p>
            </div>
            <Tooltip id='cons' place="bottom" content={`Latest consumption, occured ${offsetHours > 0 ? offsetHours + " hours" : offsetMinutes + " minutes" } ago`} />
        </>
    )
}

export default Consumption;