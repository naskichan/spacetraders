interface Props {
    label: string;
    selected: boolean;
    onSelect: () => void;
}

export default function TradeModalTab(props: Props) {
    return (
        <div 
            className={`
                flex
                flex-row
                py-2
                px-4
                transition
                cursor-pointer
                select-none
                m-1
                bg-neutral-800
                rounded-full
                ${props.selected ? "bg-neutral-700 text-picton-blue" : "hover:bg-neutral-700"}
                
            `}
            onClick={props.onSelect}
        >
            <p className="text-xl">{props.label}</p>
        </div>
    )
}