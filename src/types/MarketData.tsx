import InventoryItem from "./InventoryItem";
import TradeGood from "./TradeGood";
import Transaction from "./Transaction";

export default interface MarketData {
    symbol: string;
    exports: InventoryItem[];
    imports: InventoryItem[];
    exchange: InventoryItem[];
    transactions: Transaction[];
    tradeGoods: TradeGood[];
}