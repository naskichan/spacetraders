import { Tooltip } from "react-tooltip";
import InventoryItem from "../../types/InventoryItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox } from "@fortawesome/free-solid-svg-icons";
import Module from "../../types/Module";
import Mount from "../../types/Mount";

interface Props {
    inventoryItem?: InventoryItem;
    mount?: Mount;
    module?: Module;
    selectable?: boolean;
    selected?: boolean;
    onSelect?: () => void;
}

function Item(props: Props) {
    return (
        <>
            {props.inventoryItem && (
                <div 
                    className={`
                        ${props.selected && "border-poppy bg-onyx"}
                        flex
                        ${props.selectable && "cursor-pointer hover:border-poppy hover:bg-onyx"}
                        transition-all
                        relative
                        justify-center
                        items-center
                        bg-jet
                        rounded
                        border-2
                        border-onyx
                        h-16
                        w-16
                    `}
                    data-tooltip-id={`item-info-${props.inventoryItem.symbol}`}
                    onClick={props.selectable ? props.onSelect : () => {}}
                >
                    <FontAwesomeIcon icon={faBox} />
                    <Tooltip id={`item-info-${props.inventoryItem.symbol}`} place="bottom" content={`${props.inventoryItem.name}: ${props.inventoryItem.description}`} />
                    <p className="absolute text-sm -right-2 -bottom-2 rounded-full px-1 bg-poppy ">
                        {props.inventoryItem.units}
                    </p>
                </div>
            )}
            {props.mount && (
                <div className="
                flex
                relative
                justify-center
                items-center
                bg-jet
                rounded
                border-2
                border-onyx
                h-16
                w-16
                " data-tooltip-id={`item-info-${props.mount.symbol}`}>
                    <FontAwesomeIcon icon={faBox} />
                    <Tooltip id={`item-info-${props.mount.symbol}`} place="bottom" content={`${props.mount.name}: ${props.mount.description}`} />
                    <p className="absolute text-sm -right-2 -bottom-2 rounded-full px-1 bg-poppy ">
                        {props.mount.strength}
                    </p>
                </div>
            )}
            {props.module && (
                <div className="
                flex
                relative
                justify-center
                items-center
                bg-jet
                rounded
                border-2
                border-onyx
                h-16
                w-16
                " data-tooltip-id={`item-info-${props.module.symbol}`}>
                    <FontAwesomeIcon icon={faBox} />
                    <Tooltip id={`item-info-${props.module.symbol}`} place="bottom" content={`${props.module.name}: ${props.module.description}`} />
                    <p className="absolute text-sm -right-2 -bottom-2 rounded-full px-1 bg-poppy ">
                        {props.module.capacity}
                    </p>
                </div>
            )}  
        </>
    )
}

export default Item;