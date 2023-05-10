import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
    symbol: string;
    credits: number;
}

function Header(props: Props) {
    return (
        <div className="flex flex-row justify-between items-center mx-4 p-2 border-b-2 border-jet">
            <div className="p-2 rounded-xl bg-jet">
            <p>{props.symbol}</p>
            </div>
            <div className="flex items-center justify-center gap-2">
                <FontAwesomeIcon icon={faLayerGroup} color="#00a7e1" />
                <p>{props.credits}</p>
            </div>
            
        </div>

    )
}

export default Header;