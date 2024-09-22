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
    
      <section className="p-4 mb-4 text-center bg-light-brown-500/50">
        <h3 className="my-4 ">Shipping Method</h3>
        <div className="p-2 mx-auto space-y-4 border-2 border-solid border-black-500 md:w-[30vw]">
          {shippingMethods.map(ship => (
            <label key={ship.id} className="flex items-center justify-center ">
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
                <div className="text-sm text-gray-600">
                  Cost: ${ship.cost}
                </div>
              </div>
            </label>
          ))}
        </div>
      </section>
    
  );
};

export default Shipping;
