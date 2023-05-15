import { useState } from "react";
import InventoryItem from "../../types/InventoryItem";
import MarketData from "../../types/MarketData";
import TradeGoodLegend from "./TradeGoodLegend";
import TradeGoodRow from "./TradeGoodRow";
import TradeIntent from "../../types/TradeIntent";
import TradeSummary from "./TradeSummary";

interface Props {
    marketData: MarketData;
    inventoryItems: InventoryItem[];
}

export default function  MarketTab(props: Props) {
    const [tradeIntents, setTradeIntents] = useState<TradeIntent[]>([]); 
    function handleTradeIntent(symbol: string, amount: number, unitPrice: number) {
        const newTrades = tradeIntents.filter((trade) => trade.symbol !== symbol);
        newTrades.push({
            symbol,
            amount,
            unitPrice
        });
        setTradeIntents(newTrades);
    }
    return (
        <>
            <div className="flex flex-col">
                <TradeGoodLegend />
                {props.marketData.tradeGoods.sort((a, b) => a.symbol.localeCompare(b.symbol)).map((tradeGood) => (
                    <TradeGoodRow onTradeIntent={handleTradeIntent} key={tradeGood.symbol} tradeGood={tradeGood} amountInStorage={props.inventoryItems.filter((item) => item.symbol === tradeGood.symbol).length} />
                ))}
                
            </div>
            {tradeIntents.length > 0 && (
                <div className="flex flex-col h-40 rounded-xl pt-4 m-2">
                    <TradeSummary tradeIntents={tradeIntents} />
                </div>
            )}
        </>
        
    )
}