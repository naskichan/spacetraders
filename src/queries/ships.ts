import axios from "axios";
import Ship from "../types/Ship";

const bearerToken = `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`;

export const fetchShips = async (): Promise<Ship[]> => {
    const result = await axios.get(`${import.meta.env.VITE_API_URL}/my/ships`, {
        headers: {
            Authorization: bearerToken,
          },
    });

    return result.data.data;
}