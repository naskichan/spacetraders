import Module from "../../types/Module";
import Collapsible from "../atoms/Collapsible";
import Item from "./Item";

interface Props {
    modules: Module[];
}

function Modules(props: Props) {
    return (
        <Collapsible title={"Modules"}>
            <div className="flex flex-row flex-wrap gap-2">
                {props.modules.map((module) => (
                    <Item key={module.symbol} module={module} />
                ))}
            </div>
        </Collapsible>
    )
}

export default Modules;