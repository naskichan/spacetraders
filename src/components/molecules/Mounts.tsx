import Mount from "../../types/Mount";
import Collapsible from "../atoms/Collapsible";
import Item from "./Item";

interface Props {
    mounts: Mount[];
}

function Mounts(props: Props) {
    return (
        <Collapsible title={"Mounts"}>
            <div className="flex flex-row gap-2 select-none">
                {props.mounts.map((mount) => (
                    <Item key={mount.symbol} mount={mount} />
                ))}
            </div>
        </Collapsible>
    )
}

export default Mounts;