import ShowImage from "../ShowImage";

const Order = ({ order }) => {
  return (
    <div className="max-w-lg p-4 mx-auto bg-white rounded-md shadow-md mt-7 ">
      <div className="flex justify-center"> <ShowImage style={`cart`} url={`static/products/default_img/${order.product_image}`} /> </div>
      <span className="text-center text-balance" >*{order.quantity} {order.product_name}  ordered on {order.order_date}, {order.status} delivery {order.delivery}.  </span>
      
    </div>
  );
};

export default Order;
