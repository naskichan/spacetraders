import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import InventoryItem from '../../types/InventoryItem'
import Item from "./Item";
import { useState } from "react";

interface Props {
    close: () => void;
    waypointSymbol: string;
    systemSymbol: string;
    sellableItems: InventoryItem[];
}

interface TradeItem {
    item: InventoryItem;
    selected: boolean;
    price: number;
}

function TradeMenuModal(props: Props) {
    const [tradeItems, setTradeItems] = useState<TradeItem[]>( new Array(10).fill({
        item: {
            symbol: "test",
            name: "test",
            description: "test",
            units: 1
        },
        selected: false,
        price: 10,
    }));
    const navigate = useNavigate();
    function handleSelect(tradeItem: TradeItem) {
        const newTradeItems = tradeItems.map((item) => {
            if (item === tradeItem) {
                return {
                    ...item,
                    selected: !item.selected
                }
            }
            return item;
        })
        setTradeItems(newTradeItems);
    }
    return (
        <div className="absolute top-0 left-0 w-screen h-screen bg-black/60 flex justify-center items-center">
            <div className="bg-jet rounded-xl p-4">
                <div className="py-2 border-b border-onyx flex flex-row items-start justify-between gap-16">
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold">Trader</h2>
                        <div className="flex gap-1">
                            <p className="text-neutral-400">Waypoint</p>
                            <a className="text-picton-blue underline cursor-pointer" onClick={() => navigate(`/map/${props.waypointSymbol}`)}>{props.waypointSymbol}</a>
                        </div>
                    </div>
                    <button className="text-2xl bg-onyx px-3 py-1 rounded-xl -my-0.5" onClick={props.close}>
                        <FontAwesomeIcon icon={faClose}  />
                    </button>
                </div>
                <div className="flex flex-row gap-2 justify-between">
                    <div className="w-96 flex flex-col">
                        <h2 className="text-2xl font-bold">Buy</h2>
                        <div className="flex flex-row gap-2 flex-wrap">
                            {tradeItems.map((tradeItem) => (
                                <Item inventoryItem={tradeItem.item} selectable selected={tradeItem.selected} onSelect={() => handleSelect(tradeItem)}/>
                            ))}
                        </div>
                    </div>
                    <div className="w-96 flex flex-col">
                        <h2 className="text-2xl font-bold">Sell</h2>
                        <div className="flex flex-row gap-2 flex-wrap">
                            {tradeItems.map((tradeItem) => (
                                <Item inventoryItem={tradeItem.item} selectable selected={tradeItem.selected} onSelect={() => handleSelect(tradeItem)}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TradeMenuModal;

// Items have to be selectable and highlighted
// When an item is selected, the sell button is enabled
// The bottom has actions of moving the selected item left or right, and to specify an amount to move
// Multiple click on an item could also move just one item per additional click
// Holding shift and clicking on an item could move all items of that type
// The bottom holds information of how many credits the transaction will cost/yield