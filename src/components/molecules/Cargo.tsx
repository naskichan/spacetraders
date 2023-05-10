import { useState } from "react";
import Collapsible from "../atoms/Collapsible";
import Item from "./Item";
import CargoType from "../../types/Cargo";
import ItemType from "../../types/InventoryItem"; 

interface Props {
    cargo: CargoType;
}

const testItems: ItemType[] = [
    {
        symbol: "🍎",
        name: "Apple",
        description: "A red apple",
        units: 1
    },
    {
        symbol: "🍌",
        name: "Banana",
        description: "A yellow banana",
        units: 1
    },
    {
        symbol: "🍊",
        name: "Orange",
        description: "An orange orange",
        units: 1
    },
    {
        symbol: "🍇",
        name: "Grapes",
        description: "A bunch of grapes",
        units: 1
    },
    {
        symbol: "🍌",
        name: "Banana",
        description: "A yellow banana",
        units: 1
    },
    {
        symbol: "🍊",
        name: "Orange",
        description: "An orange orange",
        units: 1
    },
    {
        symbol: "🍇",
        name: "Grapes",
        description: "A bunch of grapes",
        units: 1
    },
    
];

function Cargo(props: Props) {
    const [items, setItems] = useState<ItemType[]>(props.cargo.inventory);
    return (
        <Collapsible title="Cargo">
            <div className="
                grid
                grid-cols-5
                gap-2
                text-xl
                font-bold
            ">  
                {items.map((item) => (
                    <Item key={item.symbol} inventoryItem={item} />
                ))}
            </div>
            <div className="flex justify-end items-center">
                <span className="text-xl font-bold">Capacity {props.cargo.capacity - props.cargo.units} / {props.cargo.capacity}</span>
            </div>

        </Collapsible>
    )
}

export default Cargo;