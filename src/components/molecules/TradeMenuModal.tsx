import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import InventoryItem from '../../types/InventoryItem'
import { useState } from "react";
import TradeModalTab from "./TradeModalTab";
import { useQuery } from "react-query";
import { queryKeys } from "../../queries/queryKeys";
import { fetchMarket } from "../../queries/markets";
import MarketTab from "./MarketTab";
import { fetchAgent } from "../../queries/agents";

interface Props {
    close: () => void;
    waypointSymbol: string;
    systemSymbol: string;
    sellableItems: InventoryItem[];
    shipSymbol: string;
}

function TradeMenuModal(props: Props) {
    const {
        data: marketData,
        isSuccess,
        isError
    } = useQuery(queryKeys.market(props.waypointSymbol), () => fetchMarket(props.systemSymbol, props.waypointSymbol))
    const {
        data: agentData,
        isSuccess: agentSuccess,
        isError: isAgentError
    } = useQuery(queryKeys.agent, fetchAgent);
    const [selectedTab, setSelectedTab] = useState<string>("Market");
    const navigate = useNavigate();
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
                        <TradeModalTab label="Market" onSelect={() => setSelectedTab("Market")} selected={selectedTab === "Market"} />
                        <TradeModalTab label="Exchange" onSelect={() => setSelectedTab("Exchange")} selected={selectedTab === "Exchange"} />
                    </div>
                    <div className="bg-neutral-800 rounded-xl">
                        {(isError || isAgentError) && (
                            <p className="text-center text-poppy text-2xl font-bold">There was an error while loading data</p>
                        )}
                        {isSuccess && (
                            <>
                                {selectedTab === "Market" ? (
                                    <MarketTab onTradeSuccess={props.close} shipSymbol={props.shipSymbol} inventoryItems={props.sellableItems} marketData={marketData} availableCredits={agentSuccess ? agentData.credits : 0} />
                                ) : (
                                    <p>Exchange</p>
                                )}
                            </>
                        )}
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