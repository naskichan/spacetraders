import InventoryItem from "./InventoryItem";

export default interface Cargo {
    capacity: number;
    units: number;
    inventory: InventoryItem[];
}