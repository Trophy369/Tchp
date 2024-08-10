import { Link } from "react-router-dom";

const AdminDash = () => {
  return (
    <>
      <h1>admin page</h1>
      <Link to="/admin/createcategory" className="flex justify-center mx-auto mt-2 text-white bg-blue-600 border-0 py-2 px-auto focus:outline-none hover:bg-indigo-600 rounded text-lg">Create Category</Link>
      <Link to="/admin/createrole" className="flex justify-center mx-auto mt-2 text-white bg-blue-600 border-0 py-2 px-auto focus:outline-none hover:bg-indigo-600 rounded text-lg">Create Role</Link>
      <Link to="/admin/addproduct" className="flex justify-center mx-auto mt-2 text-white bg-blue-600 border-0 py-2 px-auto focus:outline-none hover:bg-indigo-600 rounded text-lg">Create Product</Link>
      <Link to="/admin/createReview" className="flex justify-center mx-auto mt-2 text-white bg-blue-600 border-0 py-2 px-auto focus:outline-none hover:bg-indigo-600 rounded text-lg">Create Review</Link>
      <Link to="/admin/createShipping" className="flex justify-center mx-auto mt-2 text-white bg-blue-600 border-0 py-2 px-auto focus:outline-none hover:bg-indigo-600 rounded text-lg">Create Shipping</Link>
      <Link to="/admin/assigncategory" className="flex justify-center mx-auto mt-2 text-white bg-blue-600 border-0 py-2 px-auto focus:outline-none hover:bg-indigo-600 rounded text-lg">Assign Category</Link>
      <Link to="/admin/assignrole" className="flex justify-center mx-auto mt-2 text-white bg-blue-600 border-0 py-2 px-auto focus:outline-none hover:bg-indigo-600 rounded text-lg">Assign Role</Link>
    </>
  );
};

export default AdminDash;
