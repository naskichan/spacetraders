import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import InventoryItem from '../../types/InventoryItem'
import { useState } from "react";
import TradeModalTab from "./TradeModalTab";
import { useQuery } from "react-query";
import { queryKeys } from "../../queries/queryKeys";
import { fetchMarket } from "../../queries/markets";

interface Props {
    close: () => void;
    waypointSymbol: string;
    systemSymbol: string;
    sellableItems: InventoryItem[];
}
interface TabItem {
    label:string;
    component: React.ReactNode;
    selected: boolean;
}

function TradeMenuModal(props: Props) {
    const {
        data: marketData,
        isSuccess
    } = useQuery(queryKeys.market(props.waypointSymbol), () => fetchMarket(props.systemSymbol, props.waypointSymbol))
    const [tabs, setTabs] = useState<TabItem[]>([
        {
            label: "Trader",
            component: <div>Trader</div>,
            selected: true,
        },
        {
            label: "Exchange",
            component: <div>Exchange</div>,
            selected: false,
        }
    ]);
    isSuccess && console.log(marketData);
    const navigate = useNavigate();
    function getSelectedTab(): TabItem {
        return tabs.find((tab) => tab.selected) as TabItem;
    }
    function handleSwitchTab(tab: TabItem) {
        const newTabs = tabs.map((item) => {
            return {
                ...item,
                selected: item.label === tab.label,
            }
        });
        setTabs(newTabs);
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
                <div className="flex flex-col mt-4 justify-center items-center">
                    <div className="flex bg-neutral-800 m-2 rounded-full">
                        {tabs.map((tab) => (
                            <TradeModalTab key={tab.label} label={tab.label} onSelect={() => handleSwitchTab(tab)} selected={tab.selected} />
                        ))}
                    </div>
                    <div className="bg-neutral-800 p-2 rounded-xl">
                        {getSelectedTab().component}
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