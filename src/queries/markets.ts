import axios from "axios";

const bearerToken = `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`;

export const fetchMarket = async (systemSymbol: string, waypointSymbol: string): Promise<any> => {
    const result = await axios.get(`${import.meta.env.VITE_API_URL}/systems/${systemSymbol}/waypoints/${waypointSymbol}/market`, {
        headers: {
            Authorization: bearerToken,
        },
    })
    return result.data.data;
}