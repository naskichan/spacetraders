import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface Props {
    title: string;
    children: React.ReactNode;
}

function Collapsible(props: Props) {
    const [collapsed, setCollapsed] = useState<boolean>(true);
    return (
        <div className="flex flex-col gap-2 select-none">
            <button className="flex justify-between items-center bg-jet rounded p-2" onClick={() => setCollapsed(!collapsed)}>
                <span className="text-xl font-bold">{props.title}</span>
                <FontAwesomeIcon icon={collapsed ? faChevronDown : faChevronUp} />
            </button>
            {!collapsed && props.children}
            </div>       
    )
}

export default Collapsible;