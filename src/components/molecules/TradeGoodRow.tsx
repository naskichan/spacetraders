import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TradeGood from "../../types/TradeGood"
import { faAngleDoubleRight, faAngleLeft, faAngleRight, faBoxesStacked } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tooltip";
import { useState } from "react";

interface Props {
    tradeGood: TradeGood;
    amountInStorage: number;
    onTradeIntent: (symbol: string, amount: number, unitPrice: number) => void;
}
// Kinda unnecessary, but makes it easier to deal with a and an
enum Supply {
    ABUNDANT = "The trader has an abundant supply of this item",
    MODERATE = "The trader has a moderate supply of this item",
    LIMITED = "The trader has a limited supply of this item",
    SCARCE = "The trader has a scarce supply of this item",
}

export default function TradeGoodRow(props: Props) {
    const [tradeValue, setTradeValue] = useState<string>("0");
    const iconColor = determineColor();
    function determineColor(): string {
        switch (props.tradeGood.supply) {
            case "ABUNDANT":
                return "#22c55e";
            case "MODERATE":
                return "#bbf7d0";
            case "LIMITED":
                return "#eab308";
            case "SCARCE":
                return '#ef4444';
            default:
                return "#000000";
        }
    }
    function validate(value: string) {
        const regex = /[^0-9\-]+/;
        if(value.match(regex)) return;
        const numValue = parseInt(value);
        if(!isNaN(numValue)) {
            if(numValue < 0 && -numValue > props.amountInStorage) return;
            props.onTradeIntent(props.tradeGood.symbol, numValue, numValue < 0 ? props.tradeGood.sellPrice : props.tradeGood.purchasePrice);
        }
        setTradeValue(value);
    }
    function isMaxable() {
        return props.amountInStorage > 0 && -props.amountInStorage !== parseInt(tradeValue);
    }
    return (
        <div className="flex flex-row gap-4 px-2 py-1.5 items-center odd:bg-neutral-900 last:rounded-b-xl">
            <p className="w-96 overflow-hidden">{props.tradeGood.symbol}</p>
            <p className="w-1/5 text-center">{props.amountInStorage > 0 && props.amountInStorage}</p>
            <p className="w-1/5 text-center">{props.amountInStorage > 0 && props.tradeGood.sellPrice}</p>
            <div className="flex justify-center w-72 gap-2">
                <button className="flex justify-center items-center bg-picton-blue rounded p-1" onClick={() => {validate(parseInt(tradeValue) + 10 + '') }}>
                    <p className="text-md">10x</p>
                </button>
                <button className="flex justify-center items-center bg-picton-blue rounded p-2" onClick={() => validate(parseInt(tradeValue) + 1 + '')}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                </button>
                <input 
                    type="text" 
                    className="w-12 bg-neutral-600 rounded text-center" 
                    value={tradeValue} onBlur={(e) => (e.target.value === "" || e.target.value === "-") && validate("0")} 
                    onChange={(e) => validate(e.target.value)}
                />
                <button className={`flex justify-center items-center rounded p-2 ${-props.amountInStorage < parseInt(tradeValue) ? "bg-picton-blue" : "bg-neutral-600"}`} onClick={() => validate(parseInt(tradeValue) - 1 + '')}>
                    <FontAwesomeIcon icon={faAngleRight} />
                </button>
                <button 
                    className={`
                        flex 
                        justify-center 
                        items-center 
                        rounded p-2 
                        ${!isMaxable() ? "bg-neutral-600" : "bg-picton-blue"} 
                    `} 
                    onClick={() => isMaxable() ? validate(-props.amountInStorage + '') : null}
                >
                    <FontAwesomeIcon icon={faAngleDoubleRight} />
                </button>
            </div>
            <p className="w-1/5 text-center">{props.tradeGood.purchasePrice}</p>
            <div className="flex w-1/4 justify-center">
                <FontAwesomeIcon data-tooltip-id={`item-info-${props.tradeGood.symbol}`} icon={faBoxesStacked} color={iconColor} />
                <Tooltip id={`item-info-${props.tradeGood.symbol}`} place="bottom" content={`${Supply[props.tradeGood.supply as keyof typeof Supply]}`} />
            </div>
        </div>
    )

}