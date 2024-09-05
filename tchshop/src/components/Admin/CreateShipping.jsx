import { useEffect, useRef, useState } from "react";
import {
  getShipping,
  createShipping,
  deleteShipping,
  editShipping
} from "../../services/adminApi";

const CreateShipping = () => {
  const [shipping, setShipping] = useState([]);
  const costRef = useRef();
  const methodRef = useRef();
  const methodDescRef = useRef();
  const idRef = useRef();

  useEffect(() => {
    const fetchShipping = async () => {
      const data = await getShipping();
      setShipping(data);
    };

    fetchShipping();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const cost = costRef.current.value;
    const name = methodRef.current.value;
    const deliveryTime = methodDescRef.current.value;

    const data = await createShipping(cost, name, deliveryTime);
    console.log(data);
  };

  const handleUpdate = async () => {
    const cost = costRef.current.value;
    const id = idRef.current.value;
    await editShipping(id, cost);
  };

  const handleDelete = async () => {
    const name = methodRef.current.value;
    await deleteShipping(name);
  };

  return (
    <>
      <h1>Add Shipping Form</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="cost">Shipping Cost:</label>
          <input type="text" required ref={costRef} />
        </div>
        <div>
          <label htmlFor="method">Shipping Name:</label>
          <input type="text" required ref={methodRef} />
        </div>
        <div>
          <label htmlFor="description">Shipping Time:</label>
          <input type="text" required ref={methodDescRef} />
        </div>
        <button type="submit">Add Shipping Method</button>
      </form>
      {JSON.stringify(shipping)}
      <h2>Edit Shipping</h2>
      <div>
        <label htmlFor="id">Shipping Id:</label>
        <input type="text" required ref={idRef} />
      </div>
      <div>
        <label htmlFor="cost">Shipping Cost:</label>
        <input type="text" required ref={costRef} />
      </div>
      <button onClick={handleUpdate}>Add Cost</button>

      <h2>Delete Shipping</h2>
      <div>
        <label htmlFor="name">Shipping name:</label>
        <input type="text" required ref={methodRef} />
      </div>
      <button onClick={handleDelete}>Delete</button>
    </>
  );
};

export default CreateShipping;
