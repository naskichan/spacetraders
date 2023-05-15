import InventoryItem from "../../types/InventoryItem";
import MarketData from "../../types/MarketData";
import TradeGoodLegend from "./TradeGoodLegend";
import TradeGoodRow from "./TradeGoodRow";

interface Props {
    marketData: MarketData;
    inventoryItems: InventoryItem[];
}

export default function  MarketTab(props: Props) {
    return (
        <div className="flex flex-col">
            <TradeGoodLegend />
            {props.marketData.tradeGoods.sort((a, b) => a.symbol.localeCompare(b.symbol)).map((tradeGood) => (
                <TradeGoodRow key={tradeGood.symbol} tradeGood={tradeGood} amountInStorage={props.inventoryItems.filter((item) => item.symbol === tradeGood.symbol).length} />
            ))}
        </div>
    )
}