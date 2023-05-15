import axios from "axios";
import Waypoint from "../types/Waypoint";

const bearerToken = `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`;

export const fetchWaypoint = async (systemSymbol: string, waypointSymbol: string): Promise<Waypoint> => {
    const result = await axios.get(`${import.meta.env.VITE_API_URL}/systems/${systemSymbol}/waypoints/${waypointSymbol}`, {
        headers: {
            Authorization: bearerToken,
        },
    })
    return result.data.data;
}