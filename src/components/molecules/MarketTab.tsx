import { useState } from "react";
import InventoryItem from "../../types/InventoryItem";
import MarketData from "../../types/MarketData";
import TradeGoodLegend from "./TradeGoodLegend";
import TradeGoodRow from "./TradeGoodRow";
import TradeIntent from "../../types/TradeIntent";
import Button from "../atoms/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tooltip";
import { useMutation, useQueryClient } from "react-query";
import { purchaseCargo } from "../../queries/mutations/trade";
import { queryKeys } from "../../queries/queryKeys";

interface Props {
    marketData: MarketData;
    inventoryItems: InventoryItem[];
    availableCredits: number;
    shipSymbol: string;
    onTradeSuccess: () => void;
}

export default function  MarketTab(props: Props) {
    const queryClient = useQueryClient();
    const [tradeIntents, setTradeIntents] = useState<TradeIntent[]>([]);
    const {mutateAsync: mutatePurchases, isLoading: purchasesLoading} = useMutation(async (tradeIntents: TradeIntent[]) => {
        await Promise.all(
            tradeIntents.map((tradeIntent) => {
                return purchaseCargo(props.shipSymbol, tradeIntent)
            })
        )
    });
    const {mutateAsync: mutateSales, isLoading: salesLoading} = useMutation(async (tradeIntents: TradeIntent[]) => {
        await Promise.all(
            tradeIntents.map((tradeIntent) => {
                return purchaseCargo(props.shipSymbol, tradeIntent)
            })
        )
    });
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
    async function handleTrade() {
        // Careful, amount is negative for sales
        const sales = tradeIntents.filter((tradeIntent) => tradeIntent.amount < 0);
        if (sales.length) await mutateSales(sales);
        const purchases = tradeIntents.filter((tradeIntent) => tradeIntent.amount > 0);
        if (purchases.length) await mutatePurchases(purchases);
        queryClient.invalidateQueries([queryKeys.agent, queryKeys.ships]);
        props.onTradeSuccess();
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
                    <Button toolTipId="buy" disabled={tradeIntents.length === 0 || totalPrice > props.availableCredits} color="primary" onClick={handleTrade}>
                        {(purchasesLoading || salesLoading) && (
                            <FontAwesomeIcon icon={faSpinner} spin />
                        )}
                        <p>{totalPrice < 0 ? `Sell for ${-totalPrice}` : `Buy for ${totalPrice}`}</p>
                        <FontAwesomeIcon icon={faLayerGroup} color="#fff" />
                    </Button>
                    <Tooltip id="buy" place="bottom" content={`${totalPrice > props.availableCredits ? 'You do not have enough credits to buy these items' : totalPrice < 0 ? "Sell the selected items" : "Buy the selected items"}`} />
                </div>
            </div>
        </>
        
    )
}