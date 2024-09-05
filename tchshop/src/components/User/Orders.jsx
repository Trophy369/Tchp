import {useState, useEffect} from "react"

const Orders = () => {
    const [orders, setOrders] = useState([])

    useEffect((),[])

    return (
        <div>
            <h2>{delivery}</h2>
            <h2>{product_image}</h2>
            <h2>{product_name}</h2>
            <h2>{quantity}</h2>
            <h2>{status}</h2>
            <h2>{shipping}</h2>
            <h2>{order_date}</h2>
        </div>
    )
}

export default Orders