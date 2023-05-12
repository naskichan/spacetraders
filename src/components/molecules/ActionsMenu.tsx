import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function ActionsMenu() {
    return (
        <div className="flex flex-col gap-2">
            <button className="flex justify-between items-center bg-jet rounded p-2">
                <span className="text-xl font-bold">Actions</span>
                <FontAwesomeIcon icon={faChevronDown} />
            </button>
            <div className="flex flex-col gap-2">
                <button className="flex justify-between items-center bg-jet rounded p-2">
                    <span className="text-xl font-bold">Actions</span>
                    <FontAwesomeIcon icon={faChevronDown} />
                </button>
            </div>
        </div>
    )
}

export default ActionsMenu