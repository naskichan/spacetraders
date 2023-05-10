import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "react-tooltip";

interface Props {
    icon: IconProp;
    value: string;
    color: string;
    toolTipId: string;
    toolTipText: string;
}

function InfoChip(props: Props) {
    return(
        <>
        <div data-tooltip-id={'info-' + props.toolTipId} className="flex gap-2 p-2 rounded-xl items-center bg-onyx">
            <FontAwesomeIcon icon={props.icon} color={props.color} />
            <p className="cursor-default select-none">{props.value}</p>
        </div>
        <Tooltip id={'info-'+ props.toolTipId} place="bottom" content={props.toolTipText} />
        </>
    )
}

export default InfoChip;