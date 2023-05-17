import { useState } from "react";
import InventoryItem from "../../types/InventoryItem";
import MarketData from "../../types/MarketData";
import TradeGoodLegend from "./TradeGoodLegend";
import TradeGoodRow from "./TradeGoodRow";
import TradeIntent from "../../types/TradeIntent";
import Button from "../atoms/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";

interface Props {
    marketData: MarketData;
    inventoryItems: InventoryItem[];
}

export default function  MarketTab(props: Props) {
    const [tradeIntents, setTradeIntents] = useState<TradeIntent[]>([]); 
    function handleTradeIntent(symbol: string, amount: number, unitPrice: number) {
        const newTrades = tradeIntents.filter((trade) => trade.symbol !== symbol);
        if(amount === 0) {
            setTradeIntents(newTrades);
            return;
        }
        newTrades.push({
            symbol,
            amount,
            unitPrice
        });
        setTradeIntents(newTrades);
    }
    const totalPrice = calculateTotalPrice();
    function calculateTotalPrice() {
        return tradeIntents.reduce((total: number, tradeIntent) => total + tradeIntent.amount * tradeIntent.unitPrice, 0);
    }
    function handleTrade() {
        console.log("tradeIntents", tradeIntents);
    }
    return (
        <>
            <div className="flex flex-col">
                <TradeGoodLegend />
                {props.marketData.tradeGoods.sort((a, b) => a.symbol.localeCompare(b.symbol)).map((tradeGood) => (
                    <TradeGoodRow onTradeIntent={handleTradeIntent} key={tradeGood.symbol} tradeGood={tradeGood} amountInStorage={props.inventoryItems.filter((item) => item.symbol === tradeGood.symbol).length} />
                ))}
                
            </div>
            <div className="flex flex-col my-4">
                <div className="flex flex-row justify-end px-4">
                    <Button disabled={tradeIntents.length === 0} color="primary" onClick={handleTrade}>
                        <p>Buy for {totalPrice}</p>
                        <FontAwesomeIcon icon={faLayerGroup} color="#fff" />
                    </Button>
                </div>
            </div>
        </>
        
    )
}