
interface Props {
    color: 'primary' | 'secondary';
    className?: string;
    children: React.ReactNode;
    disabled?: boolean;
    toolTipId?: string;
    onClick: () => void;
}

function Button(props: Props) {
    function handleClick() {
        if (props.disabled) return;
        props.onClick();
    }
    return (
        <button data-tooltip-id={props.toolTipId? props.toolTipId : ''} className={`
            ${props.className}
            text-white
            font-light
            text-xl
            py-2
            border
            px-4
            rounded
            flex
            flex-row
            justify-center
            items-center
            gap-2
            ${props.disabled ? 'bg-gray-500' : ''}
            ${props.disabled ? 'cursor-default' : ''}
            ${props.disabled ? 'hover:bg-gray-500' : ''}
            ${props.color === 'primary' ? 'bg-blue-500' : 'bg-red-500'}
            ${props.color === 'primary' ? 'hover:bg-blue-600' : 'hover:bg-red-600'}
            transition
            select-none
        `}
        onClick={handleClick}
        >
            {props.children}
        </button>
    )
}

export default Button;