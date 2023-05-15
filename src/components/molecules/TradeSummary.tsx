import TradeIntent from "../../types/TradeIntent";

interface Props {
    tradeIntents: TradeIntent[];
}

export default function TradeSummary(props: Props) {
    return (
        <div className="flex flex-col gap-2">
            {props.tradeIntents.map((tradeIntent) => (
                <div key={tradeIntent.symbol} className="flex flex-row gap-2">
                    <p className="w-60 overflow-hidden">{tradeIntent.symbol}</p>
                    <p className="w-1/4">{tradeIntent.unitPrice * tradeIntent.amount}</p>
                </div>
            ))}
        </div>
    )
}