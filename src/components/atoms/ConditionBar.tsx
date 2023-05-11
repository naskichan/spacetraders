import ProgressBar from "@ramonak/react-progress-bar";

interface Props {
    type: 'health' | 'fuel';
    label: string;
    value: number;
    full?: boolean;
    maxValue: number;
}

function ConditionBar(props: Props) {
    return (
        <ProgressBar completed={props.value} maxCompleted={props.maxValue} customLabel={`${props.label} ${props.value} / ${props.maxValue}`} labelAlignment="center" height="2.5rem" width={`${props.full ? '22rem' : '10rem'}`} bgColor={`${props.type === 'health' ? '#22C55E' : '#EAB308'}`} baseBgColor="#3D3D3D" />
    )
}

export default ConditionBar;