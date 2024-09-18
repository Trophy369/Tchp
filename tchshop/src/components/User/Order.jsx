import ShowImage from "../ShowImage";
import {shipment} from "../../services/userApi"

const Order = ({ order }) => {
  const handleStatus = async () => {
    await shipment(order.product_id)
  }

  return (
    <div className="max-w-lg p-4 mx-auto bg-white rounded-md shadow-md mt-7 ">
      <div className="flex justify-center"> <ShowImage style={`cart`} url={`static/products/default_img/${order.product_image}`} /> </div>
      <span className="text-center text-balance" >Delivery: {order.delivery},  *{order.quantity} {order.product_name}  ordered on {order.order_date}, 
         </span>
         <p  className="text-center text-violet-700"> {order.status}.</p>
      <div className="flex justify-center mt-4">
      <button
          onClick={handleStatus}
          className="px-6 py-2 my-2 text-white bg-blue-500 rounded-lg"
        >
          Order Status?
        </button>
        
      </div>
    </div>
  );
};

export default Order;
