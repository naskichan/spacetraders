interface Props {
    selectedMode: "CRUISE" | "BURN" | "DRIFT" | "STEALTH";
    onClick: (mode: "CRUISE" | "BURN" | "DRIFT" | "STEALTH") => void;
}

function FlightModeSwitch(props: Props) {
    return (
        <div className="flex flex-row">
            <button onClick={() => props.selectedMode !== 'CRUISE' && props.onClick('CRUISE')} className={`
                font-light
                text-l
                rounded-l-xl
                p-2
                w-16
                transition
                ${props.selectedMode === 'CRUISE' ? 'bg-green-800 text-neutral-400' : 'bg-green-500 text-white'}
                ${props.selectedMode === 'CRUISE' ? 'hover:bg-green-900' : 'hover:bg-green-600'}
            `}>
                Cruise
            </button>
            <button onClick={() => props.selectedMode !== 'BURN' && props.onClick('BURN')} className={`
                font-light
                text-l
                p-2
                w-16
                transition
                ${props.selectedMode === 'BURN' ? 'bg-red-800 text-neutral-400' : 'bg-red-500 text-white'}
                ${props.selectedMode === 'BURN' ? 'hover:bg-red-900' : 'hover:bg-red-600'}
            `}>
                Burn
            </button>
            <button onClick={() => props.selectedMode !== 'DRIFT' && props.onClick('DRIFT')} className={`
                text-white
                font-light
                text-l
                p-2
                w-16
                transition
                ${props.selectedMode === 'DRIFT' ? 'bg-blue-800 text-neutral-400' : 'bg-blue-500 text-white'}
                ${props.selectedMode === 'DRIFT' ? 'hover:bg-blue-900' : 'hover:bg-blue-600'}
            `}>
                Drift
            </button>
            <button onClick={() => props.selectedMode !== 'STEALTH' && props.onClick('STEALTH')} className={`
                text-white
                font-light
                rounded-r-xl
                text-l
                p-2
                w-16
                transition
                ${props.selectedMode === 'STEALTH' ? 'bg-purple-800 text-neutral-400' : 'bg-purple-500 text-white'}
                ${props.selectedMode === 'STEALTH' ? 'hover:bg-purple-900' : 'hover:bg-purple-600'}
            `}>
                Stealth
            </button>
        </div>
    )
}

export default FlightModeSwitch;