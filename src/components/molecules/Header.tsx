import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router";
import { useQuery } from "react-query";
import { queryKeys } from "../../queries/queryKeys";
import { fetchAgent } from "../../queries/agents";

interface Props {
    navItems: any[];
}

function Header(props: Props) {
    const location = useLocation();
    const navigate = useNavigate();
    const current = props.navItems.find((item) => item.path === location.pathname);
    const {
        data: agentData,
        isLoading,
        isSuccess,
    } = useQuery(queryKeys.agent, fetchAgent)

    function handleNavigate(item: any) {
        navigate(item.path);
    }
    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div className="flex flex-row justify-between items-center mx-4 p-2 border-b-2 border-jet">
            <div className="p-2 rounded-xl bg-jet">
            <p>{isSuccess ? agentData.symbol : 0}</p>
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
                <p>{isSuccess ? agentData.credits : 0}</p>
            </div>
            
        </div>

    )
}

export default Header;