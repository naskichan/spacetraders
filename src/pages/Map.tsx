import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

function Map() {
    return (
        <div className="flex justify-center items-center w-96 h-96 overflow-hidden">
            <TransformWrapper >
                <TransformComponent contentStyle={{
                    cursor: "pointer",
                    height: "300rem",
                    width: "300rem",
                    backgroundColor: "white",
                    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 99px, #ccc 99px, #ccc 100px), repeating-linear-gradient(-90deg, transparent, transparent 99px, #ccc 99px, #ccc 100px)",
                }}>
                </TransformComponent>
            </TransformWrapper>
        </div>
    )
}

export default Map;