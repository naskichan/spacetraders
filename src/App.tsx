import axios from "axios"
import { useEffect, useState } from "react";
import Ship from "./components/molecules/Ship";
import Header from "./components/molecules/Header";

interface DashboardData {
  credits: number;
  symbol: string;
  ships: any[];
}

const bearer = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiTkFTS0lfRkxFRVQiLCJpYXQiOjE2ODM3MjM1NTMsInN1YiI6ImFnZW50LXRva2VuIn0.mB0povpDWqTPoq9XKYPdjP98GiEpzO34HOm1pUW-_iEwcOfnWu2A85mAzHap3LaFwnaY6OELpscWdi7fGwrSCZLi_07huSfowNE9dDHDyEeU7RUOhiFjanq2DZbGo8bU7dETXvGbktJsU8EJaoxY7NzXI8DGfIA6QtE0xtFH8Mb6JpH-FgP5tXuemKnSPeEBehOktare_W9pl2sbed7D79Bd0oJP_a1Nlrb2eaWmQGXrPIW4C0Gh17IWN5fs7eZpFJ53OEwFniGjoj_le9rbF0ScuEKya2LADTq8FPsS0bg0rD_O9qJ1SW85CV57KMOGHWsguxOiBNkeEEVtUISP5plKFek3yGXz123R_t8VzseTnm5GXm6T0gVRiAj5dehAzmJjhBhJNgMdv0wnWFtiYhiNL_-icdGR44dwv0xRU9vatvKcU8px4G2NZqe8k_fmq-e7VFcQUnnSAK7pl2hVbhSK6C6rYST1dSjZS86KuDU6244CIdz5ZPu2CqZzQIBg';

function App() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  useEffect(() => {
    async function fetchDashboardData() {
      const agentData = await axios.get('https://api.spacetraders.io/v2/my/agent', {
        headers: {
          Authorization: `Bearer ${bearer}`
        },
      });

      const shipData = await axios.get('https://api.spacetraders.io/v2/my/ships', {
        headers: {
          Authorization: `Bearer ${bearer}`
        },
      });
      const dashboardData: DashboardData = {
        credits: agentData.data.data.credits,
        symbol: agentData.data.data.symbol,
        ships: shipData.data.data,
      };
      setDashboardData(dashboardData);
      console.log(dashboardData);
    }
    fetchDashboardData();
  }, [])
  if (!dashboardData) {
    return <p>Loading...</p>
  }

  return (
    <div>
        <Header credits={dashboardData.credits} symbol={dashboardData.symbol} />
        {dashboardData.ships.map((ship) => (
          <Ship key={ship.symbol} ship={ship} />
        )
        
        )}
    </div>
  )
}

export default App

