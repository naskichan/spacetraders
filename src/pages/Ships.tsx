import { useQuery } from "react-query";
import Ship from "../components/molecules/Ship";
import { queryKeys } from "../queries/queryKeys";
import { fetchShips } from "../queries/ships";

function Ships() {

    const {
      data: shipData,
      isSuccess,
      isError,
    } = useQuery(queryKeys.ships, fetchShips);

    return (
        <>
          {isSuccess && (
            <>
              {shipData.map((ship) => (
                  <Ship key={ship.symbol} ship={ship} />
              ))}
            </>
          )}
          {isError && <p>There was an error while loading ships</p>}
        </>
    )
}

export default Ships;