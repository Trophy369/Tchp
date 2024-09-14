import { useEffect, useRef, useState } from "react";
import {
  getShipping,
  createShipping,
  deleteShipping,
  editShipping,
} from "../../services/adminApi";
import { FaTrash } from "react-icons/fa"; // Import the FaTrash icon

const CreateShipping = () => {
  const [shipping, setShipping] = useState([]);

  // Separate refs for create and edit/delete forms
  const createCostRef = useRef();
  const createMethodRef = useRef();
  const createMethodDescRef = useRef();

  const editCostRef = useRef();
  const editIdRef = useRef();

  const deleteMethodRef = useRef();

  useEffect(() => {
    const fetchShipping = async () => {
      const data = await getShipping();
      setShipping(data);
    };

    fetchShipping();
  }, []);

  // Handle the form submission for creating a new shipping method
  const handleSubmit = async (e) => {
    e.preventDefault();
    const cost = createCostRef.current.value;
    const name = createMethodRef.current.value;
    const deliveryTime = createMethodDescRef.current.value;

    const data = await createShipping(cost, name, deliveryTime);
    console.log(data);

    // Refresh the shipping list and reset the form
    await fetchShipping();
    createCostRef.current.value = "";
    createMethodRef.current.value = "";
    createMethodDescRef.current.value = "";
  };

  // Handle updating an existing shipping method
  const handleUpdate = async (id) => {
    const cost = editCostRef.current.value;

    await editShipping(id, cost);

    // Refresh the shipping list and reset the edit form
    await fetchShipping();
    editCostRef.current.value = "";
    editIdRef.current.value = "";
  };

  // Handle deleting a shipping method by its name
  const handleDelete = async (name) => {
    await deleteShipping(name);

    // Refresh the shipping list
    await fetchShipping();
  };

  return (
    <div className="container p-6 mx-auto mt-11 mb-44">
      <h1 className="mb-4 text-2xl font-semibold text-center">Add Shipping Method</h1>

      {/* Create Shipping Form */}
      <form onSubmit={handleSubmit} className="p-4 mb-8 bg-white rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="cost" className="block text-sm font-medium text-gray-700">
            Shipping Cost:
          </label>
          <input
            type="text"
            required
            ref={createCostRef}
            className="w-full p-2 mt-1 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="method" className="block text-sm font-medium text-gray-700">
            Shipping Name:
          </label>
          <input
            type="text"
            required
            ref={createMethodRef}
            className="w-full p-2 mt-1 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Shipping Time:
          </label>
          <input
            type="text"
            required
            ref={createMethodDescRef}
            className="w-full p-2 mt-1 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="block px-4 py-2 mx-auto text-white bg-blue-500 rounded hover:bg-blue-600">
          Add Shipping Method
        </button>
      </form>

      <h2 className="mb-4 text-xl font-semibold text-center">Shipping Methods</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {shipping.length > 0 ? (
          shipping.map((item) => (
            <div key={item.id} className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="mb-2 text-lg font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-700">Cost: ${item.cost}</p>
              <p className="text-sm text-gray-700">Delivery Time: {item.deliveryTime}</p>

              <div className="flex items-center mt-4">
                <input
                  type="text"
                  placeholder="Update Cost"
                  ref={editCostRef}
                  className="w-full p-2 mr-2 border border-gray-300 rounded"
                />
                <button
                  onClick={() => handleUpdate(item.id)}
                  className="p-2 text-white bg-yellow-500 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.name)}
                  className="p-2 ml-2 text-red-500 rounded hover:text-red-700"
                >
                  <FaTrash /> {/* Trash icon from react-icons */}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No shipping methods available</p>
        )}
      </div>
    </div>
  );
};

export default CreateShipping;
