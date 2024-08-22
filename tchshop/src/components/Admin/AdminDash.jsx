import { Link } from "react-router-dom";

const AdminDash = () => {
  return (
    <>
      <h1>admin page</h1>
      <Link to="/admin/createproduct" className="flex justify-center mx-auto mt-2 text-white bg-blue-600 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg w-48">Create Product</Link>
      <Link to="/admin/createcategory" className="flex justify-center mx-auto mt-2 text-white bg-blue-600 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg w-48">Category</Link>
      <Link to="/admin/createrole" className="flex justify-center mx-auto mt-2 text-white bg-blue-600 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg w-48">Create Role</Link>
      <Link to="/admin/createReview" className="flex justify-center mx-auto mt-2 text-white bg-blue-600 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg w-48">Create Review</Link>
      <Link to="/admin/createShipping" className="flex justify-center mx-auto mt-2 text-white bg-blue-600 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg w-48">Create Shipping</Link>
      <Link to="/admin/assignrole" className="flex justify-center mx-auto mt-2 text-white bg-blue-600 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg w-48">Assign Role</Link>
      <Link to="/admin/Coupons" className="flex justify-center mx-auto mt-2 text-white bg-blue-600 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg w-48">Coupon</Link>
    </>
  );
};

export default AdminDash;
