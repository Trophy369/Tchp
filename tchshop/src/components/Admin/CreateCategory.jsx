import React, { useEffect, useRef, useState } from "react";
import { createCategory, deleteCategory, assignCategory } from "../../services/adminApi";
import { viewCategory } from "../../services/userApi";
import { FaTrash, FaPlus } from "react-icons/fa";

const CreateCategory = () => {
  const nameRef = useRef();
  const [categories, setCategories] = useState([]);
  const [productName, setProductName] = useState("");
  const [categoryToAssign, setCategoryToAssign] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const {data} = await viewCategory();
      setCategories(data);
    };

    fetchCategories();
  }, []);

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
    <div className="max-w-xl p-8 mx-auto bg-white rounded shadow-md mt-11 mb-44">
      <h1 className="mb-4 text-2xl font-bold">Manage Categories</h1>

      {/* Add Category Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 text-sm font-bold text-gray-700">
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
          className="flex items-center justify-center w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          <FaPlus className="mr-2" />
          Add Category
        </button>
      </form>

      {/* Assign Category to Product Form */}
      <form onSubmit={handleAssignCategory} className="mb-6">
        <div className="mb-4">
          <label htmlFor="productName" className="block mb-2 text-sm font-bold text-gray-700">
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
          <label htmlFor="categoryToAssign" className="block mb-2 text-sm font-bold text-gray-700">
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
          className="flex items-center justify-center w-full px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
        >
          <FaPlus className="mr-2" />
          Assign Category
        </button>
      </form>

      {/* List of Categories */}
      <h2 className="mb-4 text-xl font-bold">Existing Categories</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id} className="flex items-center justify-between p-2 bg-gray-100 rounded">
            <span className="text-gray-800">{category.category_name}</span>
            <button
              onClick={() => handleDelete(category.id)}
              className="flex items-center text-red-600 hover:text-red-800"
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
