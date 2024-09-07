import { useState, useEffect } from "react";
import { viewOrder } from "../../services/userApi";
import Order from "./Order"

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const {data} = await viewOrder();
      setOrders(data);
    };
    fetchOrders()
  }, []);

  return (
    <div>
        <h1>odooo</h1>
        {orders.map(order => <Order key={order.id} order={order} />)}
    </div>
  );
};

export default Orders;
