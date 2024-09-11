import { Link } from "react-router-dom";

const AdminDash = () => {
  return (
    <>
      <h1>admin page</h1>
      <Link to="/admin/createproduct" className="flex justify-center mx-auto mt-2 text-white bg-blue-600 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg w-48">Create Product</Link>
      <Link to="/admin/createcategory" className="flex justify-center mx-auto mt-2 text-white bg-blue-600 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg w-48">Category</Link>
      <Link to="/admin/createReview" className="flex justify-center mx-auto mt-2 text-white bg-blue-600 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg w-48">Create Review</Link>
      <Link to="/admin/createShipping" className="flex justify-center mx-auto mt-2 text-white bg-blue-600 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg w-48">Shipping</Link>
      <Link to="/admin/assignrole" className="flex justify-center mx-auto mt-2 text-white bg-blue-600 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg w-48">User Role</Link>
      <Link to="/admin/Coupons" className="flex justify-center mx-auto mt-2 text-white bg-blue-600 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg w-48">Coupon</Link>
      <Link to="/admin/wallets" className="flex justify-center mx-auto mt-2 text-white bg-blue-600 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg w-48">Wallets</Link>
      <p>PWFGMB</p>
    </>
  );
};

export default AdminDash;
