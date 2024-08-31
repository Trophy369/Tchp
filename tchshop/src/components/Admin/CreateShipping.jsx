import { useEffect, useRef, useState } from "react";
import { getShipping, createShipping, deleteShipping } from "../../services/adminApi";

const CreateShipping = () => {
  const [shipping, setShipping] = useState([]);
  const costRef = useRef()
  const methodRef = useRef()
  const methodDescRef = useRef()

  useEffect(() => {
    const fetchShipping = async (id) => {
      const data = await getShipping(id);
      setShipping(data);
    };

    fetchShipping();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cost = costRef.current.value
    const name = methodRef.current.value;
    const deliveryTime = methodDescRef.current.value;

    const data = await createShipping(cost, name, deliveryTime);
    console.log(data)
   }

  return (
    <>
      <h1>Add Shipping Form</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="cost">Shipping Cost:</label>
          <input type="text" required ref={costRef}/>
        </div>
        <div>
          <label htmlFor="method">Shipping Name:</label>
          <input type="text" required ref={methodRef}/>
        </div>
        <div>
          <label htmlFor="description">Shipping Time:</label>
          <input type="text" required ref={methodDescRef}/>
        </div>
        <button type="submit">Add Shipping Method</button>
      </form>
    </>
  );
};

export default CreateShipping;
