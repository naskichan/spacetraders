import { useState } from "react";
import InventoryItem from "../../types/InventoryItem";
import MarketData from "../../types/MarketData";
import TradeGoodLegend from "./TradeGoodLegend";
import TradeGoodRow from "./TradeGoodRow";
import TradeIntent from "../../types/TradeIntent";
import Button from "../atoms/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tooltip";

interface Props {
    marketData: MarketData;
    inventoryItems: InventoryItem[];
    availableCredits: number;
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
        const purchases = tradeIntents.filter((tradeIntent) => tradeIntent.amount > 0);
        const sales = tradeIntents.filter((tradeIntent) => tradeIntent.amount < 0);
        purchases.length ? console.log("purchases", purchases) : console.log("no purchases");
        sales.length ? console.log("sales", sales) : console.log("no sales");
    }
    return (
        <>
            <div className="flex flex-col">
                <TradeGoodLegend />
                {props.marketData.tradeGoods.sort((a, b) => a.symbol.localeCompare(b.symbol)).map((tradeGood) => (
                    //<TradeGoodRow onTradeIntent={handleTradeIntent} key={tradeGood.symbol} tradeGood={tradeGood} amountInStorage={props.inventoryItems.filter((item) => item.symbol === tradeGood.symbol).length} />
                    <TradeGoodRow onTradeIntent={handleTradeIntent} key={tradeGood.symbol} tradeGood={tradeGood} amountInStorage={1} />
                ))}
                
            </div>
            <div className="flex flex-col my-4">
                <div className="flex flex-row justify-end px-4">
                    <Button toolTipId="buy" disabled={tradeIntents.length === 0 || totalPrice > props.availableCredits} color="primary" onClick={handleTrade}>
                        <p>{totalPrice < 0 ? `Sell for ${-totalPrice}` : `Buy for ${totalPrice}`}</p>
                        <FontAwesomeIcon icon={faLayerGroup} color="#fff" />
                    </Button>
                    <Tooltip id="buy" place="bottom" content={`${totalPrice > props.availableCredits ? 'You do not have enough credits to buy these items' : totalPrice < 0 ? "Sell the selected items" : "Buy the selected items"}`} />
                </div>
            </div>
        </>
        
    )
}