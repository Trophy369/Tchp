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
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Add Shipping Method</h1>

      {/* Create Shipping Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md mb-8">
        <div className="mb-4">
          <label htmlFor="cost" className="block text-sm font-medium text-gray-700">
            Shipping Cost:
          </label>
          <input
            type="text"
            required
            ref={createCostRef}
            className="w-full p-2 border border-gray-300 rounded mt-1"
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
            className="w-full p-2 border border-gray-300 rounded mt-1"
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
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Add Shipping Method
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Shipping Methods</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {shipping.length > 0 ? (
          shipping.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
              <p className="text-sm text-gray-700">Cost: ${item.cost}</p>
              <p className="text-sm text-gray-700">Delivery Time: {item.deliveryTime}</p>

              <div className="flex items-center mt-4">
                <input
                  type="text"
                  placeholder="Update Cost"
                  ref={editCostRef}
                  className="w-full p-2 border border-gray-300 rounded mr-2"
                />
                <button
                  onClick={() => handleUpdate(item.id)}
                  className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.name)}
                  className="ml-2 p-2 rounded text-red-500 hover:text-red-700"
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
