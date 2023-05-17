import { useQuery } from "react-query";
import Ship from "../components/molecules/Ship";
import { queryKeys } from "../queries/queryKeys";
import { fetchShips } from "../queries/ships";
import { useState } from "react";
import TradeMenuModal from "../components/molecules/TradeMenuModal";
import InventoryItem from "../types/InventoryItem";

function Ships() {

    const {
      data: shipData,
      isSuccess,
      isError,
    } = useQuery(queryKeys.ships, fetchShips);
    const [traderMenuOpen, setTraderMenuOpen] = useState<boolean>(false);
    const [waypointSymbol, setWaypointSymbol] = useState<string>("");
    const [systemSymbol, setSystemSymbol] = useState<string>("");
    const [shipSymbol, setShipSymbol] = useState<string>("");
    const [shipInventory, setShipInventory] = useState<InventoryItem[]>([]);

    function handleTraderMenuOpen(waypointSymbol: string, systemSymbol: string, symbol: string, shipInventory: InventoryItem[]) {
      setTraderMenuOpen(true);
      setWaypointSymbol(waypointSymbol);
      setSystemSymbol(systemSymbol);
      setShipSymbol(symbol);
      setShipInventory(shipInventory);
    }

    return (
        <>
          {isSuccess && (
            <>
              {shipData.map((ship) => (
                  <Ship key={ship.symbol} ship={ship} openTraderMenu={(waypointSymbol, systemSymbol) => handleTraderMenuOpen(waypointSymbol, systemSymbol, ship.symbol, ship.cargo.inventory)} />
                  ))}
            </>
          )}
          {isError && <p>There was an error while loading ships</p>}
          {traderMenuOpen && (
              <TradeMenuModal shipSymbol={shipSymbol} sellableItems={shipInventory} waypointSymbol={waypointSymbol} systemSymbol={systemSymbol} close={() => setTraderMenuOpen(false)}/>
          )}
        </>
    )
}

export default Ships;