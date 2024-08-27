import ShowImage from "../ShowImage"

const OrderCart = ({cartP}) => {
  return (
    <div>
      <div className="flex space-x-4">
        <div className="relative">
          <ShowImage
            url={`static/products/default_img/${cartP.product_image}`}
            alt="Product"
            style="order"
          />
          <div className="absolute top-0 right-0 px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
            {cartP.prod_quantity}
          </div>
        </div>
        <div className="flex justify-between w-full">
          <div className="text-lg font-semibold">{cartP.product_name}</div>
          <div className="text-lg font-semibold">${cartP.discounted_price}</div>
        </div>
      </div>
    </div>
  );
};

export default OrderCart;
