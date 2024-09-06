import ShowImage from "../ShowImage";

const Order = ({ order }) => {
  return (
    <div>
      <ShowImage url={`static/products/default_img/${order.product_image}`} />
      <p>{order.delivery}</p>
      <p>{order.order_date}</p>
      <p>{order.product_name}</p>
      <p>{order.quantity}</p>
      <p>{order.shipping}</p>
      <p>{order.status}</p>
    </div>
  );
};

export default Order;
