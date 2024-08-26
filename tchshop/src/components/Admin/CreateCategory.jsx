import React, { useEffect, useRef, useState } from "react";
import { createCategory, getCategory, deleteCategory, assignCategory } from "../../services/adminApi";
import { FaTrash, FaPlus } from "react-icons/fa"; // Importing icons

const CreateCategory = () => {
  const nameRef = useRef();
  const [categories, setCategories] = useState([]);
  const [productName, setProductName] = useState("");
  const [categoryToAssign, setCategoryToAssign] = useState("");

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     const data = await getCategory(); // Assuming getCategory() fetches all categories
  //     setCategories(data);
  //   };

  //   fetchCategories();
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const category_name = nameRef.current.value;

    const data = await createCategory(category_name);
    setCategories([...categories, data]); // Update category list with new category
    nameRef.current.value = ""; // Clear input field
  };

  const handleDelete = async (id) => {
    await deleteCategory(id);
    setCategories(categories.filter((category) => category.id !== id));
  };

  const handleAssignCategory = async (e) => {
    e.preventDefault();
    await assignCategory(productName, categoryToAssign);
    setProductName("");
    setCategoryToAssign("");
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">Manage Categories</h1>

      {/* Add Category Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Category Name:
          </label>
          <input
            type="text"
            ref={nameRef}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter category name"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center justify-center"
        >
          <FaPlus className="mr-2" />
          Add Category
        </button>
      </form>

      {/* Assign Category to Product Form */}
      <form onSubmit={handleAssignCategory} className="mb-6">
        <div className="mb-4">
          <label htmlFor="productName" className="block text-gray-700 text-sm font-bold mb-2">
            Product Name:
          </label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter product name"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="categoryToAssign" className="block text-gray-700 text-sm font-bold mb-2">
            Category to Assign:
          </label>
          <input
            type="text"
            value={categoryToAssign}
            onChange={(e) => setCategoryToAssign(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter category to assign"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 flex items-center justify-center"
        >
          <FaPlus className="mr-2" />
          Assign Category
        </button>
      </form>

      {/* List of Categories */}
      <h2 className="text-xl font-bold mb-4">Existing Categories</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
            <span className="text-gray-800">{category.name}</span>
            <button
              onClick={() => handleDelete(category.id)}
              className="text-red-600 hover:text-red-800 flex items-center"
            >
              <FaTrash className="mr-2" />
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateCategory;
