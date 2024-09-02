import { useState, useEffect } from "react";
import { getShipping } from "../../services/userApi";

const Shipping = ({selectedShippingMethod, setSelectedShippingMethod}) => {
  const [shippingMethods, setShippingMethods] = useState([]);

  useEffect(() => {
    const fetchShipping = async () => {
      const shipReq = await getShipping();
      setShippingMethods(shipReq);
      if (shipReq && shipReq.length > 0) {
        setSelectedShippingMethod(shipReq[0].id);
      }
    };

    fetchShipping();
  }, []);

  return (
    <div className="text-center">
      <p className="inline-block px-4 py-2 my-4 text-center bg-gray-100 border border-black">
        Shipping is calculated at checkout
      </p>
      <section className="p-4 mb-8 border-2 border-black bg-light-brown-500/50">
        <h2 className="mb-2 text-xl font-semibold">Shipping Method</h2>
        <div className="space-y-4">
          {shippingMethods.map(ship => (
            <label key={ship.id} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedShippingMethod === ship.id}
                onChange={() => setSelectedShippingMethod(ship.id)}
                className="mr-2 text-black form-checkbox border-ash-300"
              />
              <div>
                <span className="font-semibold">{ship.name}</span>
                <div className="text-sm text-gray-600">
                  Delivery Time: {ship.deliveryTime}
                </div>
              </div>
            </label>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Shipping;
