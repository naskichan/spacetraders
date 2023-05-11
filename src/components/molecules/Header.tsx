import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const bearer = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiTkFTS0lfRkxFRVQiLCJpYXQiOjE2ODM3MjM1NTMsInN1YiI6ImFnZW50LXRva2VuIn0.mB0povpDWqTPoq9XKYPdjP98GiEpzO34HOm1pUW-_iEwcOfnWu2A85mAzHap3LaFwnaY6OELpscWdi7fGwrSCZLi_07huSfowNE9dDHDyEeU7RUOhiFjanq2DZbGo8bU7dETXvGbktJsU8EJaoxY7NzXI8DGfIA6QtE0xtFH8Mb6JpH-FgP5tXuemKnSPeEBehOktare_W9pl2sbed7D79Bd0oJP_a1Nlrb2eaWmQGXrPIW4C0Gh17IWN5fs7eZpFJ53OEwFniGjoj_le9rbF0ScuEKya2LADTq8FPsS0bg0rD_O9qJ1SW85CV57KMOGHWsguxOiBNkeEEVtUISP5plKFek3yGXz123R_t8VzseTnm5GXm6T0gVRiAj5dehAzmJjhBhJNgMdv0wnWFtiYhiNL_-icdGR44dwv0xRU9vatvKcU8px4G2NZqe8k_fmq-e7VFcQUnnSAK7pl2hVbhSK6C6rYST1dSjZS86KuDU6244CIdz5ZPu2CqZzQIBg';


interface Props {
    navItems: any[];

}

function Header(props: Props) {
    const [agentData, setAgentData] = useState<any | null>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const current = props.navItems.find((item) => item.path === location.pathname);
    useEffect(() => {
        async function fetchAgentData() {
            const agentData = await axios.get('https://api.spacetraders.io/v2/my/agent', {
            headers: {
                Authorization: `Bearer ${bearer}`
            },
        });
        setAgentData(agentData.data.data);
        }
        fetchAgentData();
    }, [])

    function handleNavigate(item: any) {
        navigate(item.path);
    }

    if (!agentData) {
        return <></>
    }

    return (
        <div className="flex flex-row justify-between items-center mx-4 p-2 border-b-2 border-jet">
            <div className="p-2 rounded-xl bg-jet">
            <p>{agentData.symbol}</p>
            </div>
            <div className="flex items-center justify-center gap-4">
                {props.navItems.map((item) => (
                    <div key={item.path} onClick={() => handleNavigate(item)} className="flex flex-row items-center justify-center gap-2 cursor-pointer h-12 hover:bg-jet px-4 rounded transition">
                        <FontAwesomeIcon icon={item.icon} color={current === item ? "#00a7e1" : "#fff"} />
                        <p className={current === item ? "text-picton-blue" : "text-white"}>{item.label}</p>
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-center gap-2">
                <FontAwesomeIcon icon={faLayerGroup} color="#00a7e1" />
                <p>{agentData.credits}</p>
            </div>
            
        </div>

    )
}

export default Header;