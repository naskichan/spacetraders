import { useQuery } from "react-query";
import Ship from "../components/molecules/Ship";
import { queryKeys } from "../queries/queryKeys";
import { fetchShips } from "../queries/ships";
import { useState } from "react";
import TradeMenuModal from "../components/molecules/TradeMenuModal";

function Ships() {

    const {
      data: shipData,
      isSuccess,
      isError,
    } = useQuery(queryKeys.ships, fetchShips);
    const [traderMenuOpen, setTraderMenuOpen] = useState<boolean>(false);
    const [waypointSymbol, setWaypointSymbol] = useState<string>("");
    const [systemSymbol, setSystemSymbol] = useState<string>("");

    function handleTraderMenuOpen(waypointSymbol: string, systemSymbol: string) {
      setTraderMenuOpen(true);
      setWaypointSymbol(waypointSymbol);
      setSystemSymbol(systemSymbol);
    }

    return (
        <>
          {isSuccess && (
            <>
              {shipData.map((ship) => (
                  <Ship key={ship.symbol} ship={ship} openTraderMenu={(waypointSymbol, systemSymbol) => handleTraderMenuOpen(waypointSymbol, systemSymbol)} />
              ))}
            </>
          )}
          {isError && <p>There was an error while loading ships</p>}
          {traderMenuOpen && (
              <TradeMenuModal sellableItems={[]} waypointSymbol={waypointSymbol} systemSymbol={systemSymbol} close={() => setTraderMenuOpen(false)}/>
            )}
        </>
    )
}

export default Ships;