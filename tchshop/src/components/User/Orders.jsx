import { useState, useEffect } from "react";
import { viewOrder } from "../../services/userApi";
import Order from "./Order";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await viewOrder();
        // Ensure data is an array before setting it
        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching orders:", error);
        // Optionally set orders to an empty array on error
        setOrders([]);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="mt-11 mb-44">
      <h1 className="font-bold text-center">Orders</h1>
      {orders && orders.length > 0 ? (
        orders.map(order => (
          <Order key={order.id} order={order} />
        ))
      ) : (
        <p className="p-6 text-center">No orders found.</p>
      )}
    </div>
  );
};

export default Orders;
