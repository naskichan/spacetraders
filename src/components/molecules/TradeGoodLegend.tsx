export default function TradeGoodLegend() {
    return (
        <div className="flex flex-row gap-2 bg-neutral-600 rounded-t-xl px-2 py-1">
            <p className="w-96">Item Name</p>
            <p className="w-1/5">Quantity</p>
            <p className="w-1/5">Sell Price</p>
            <div className="w-72" />
            <p className="w-1/5 text-center">Buy Price</p>
            <div className="flex justify-center w-1/4">Supply</div>

        </div>
    )
}