import axios from "axios";
import { Agent } from "../types/Agent";

const bearerToken = `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`;


export const fetchAgent = async (): Promise<Agent> => {
    const result = await axios.get(`${import.meta.env.VITE_API_URL}/my/agent`, {
        headers: {
            Authorization: bearerToken,
          },
    });

    return result.data.data;
}