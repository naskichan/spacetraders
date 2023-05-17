import axios from "axios";
import TradeIntent from "../../types/TradeIntent";
const bearerToken = `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`;

export const purchaseCargo = async (shipSymbol: string, tradeIntent: TradeIntent) => {
    console.log("Sending this request", {
        url: `${import.meta.env.VITE_API_URL}/my/ships/${shipSymbol}/purchase`,
        data: {
            symbol: tradeIntent.symbol,
            units: Math.abs(tradeIntent.amount),
        },
    });

    const result = await axios.post(`${import.meta.env.VITE_API_URL}/my/ships/${shipSymbol}/purchase`,
        {
            symbol: tradeIntent.symbol,
            units: Math.abs(tradeIntent.amount),
        },
        {
            headers: {
                Authorization: bearerToken,
            },
        }
    );
    return result;
}