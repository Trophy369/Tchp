import { Link } from "react-router-dom";

const AdminDash = () => {
  return (
    <section className="mt-11 mb-44">
      <h1 className="my-2 text-xl font-bold text-center">ADMIN</h1>
      <Link to="/admin/createproduct" className="flex justify-center w-48 px-4 py-2 mx-auto mt-2 text-lg text-white bg-blue-600 border-0 rounded focus:outline-none hover:bg-indigo-600">Create Product</Link>
      <Link to="/admin/createcategory" className="flex justify-center w-48 px-4 py-2 mx-auto mt-2 text-lg text-white bg-blue-600 border-0 rounded focus:outline-none hover:bg-indigo-600">Category</Link>
      <Link to="/admin/createrole" className="flex justify-center w-48 px-4 py-2 mx-auto mt-2 text-lg text-white bg-blue-600 border-0 rounded focus:outline-none hover:bg-indigo-600">Create Role</Link>
      <Link to="/admin/createReview" className="flex justify-center w-48 px-4 py-2 mx-auto mt-2 text-lg text-white bg-blue-600 border-0 rounded focus:outline-none hover:bg-indigo-600">Create Review</Link>
      <Link to="/admin/createShipping" className="flex justify-center w-48 px-4 py-2 mx-auto mt-2 text-lg text-white bg-blue-600 border-0 rounded focus:outline-none hover:bg-indigo-600">Shipping</Link>
      <Link to="/admin/assignrole" className="flex justify-center w-48 px-4 py-2 mx-auto mt-2 text-lg text-white bg-blue-600 border-0 rounded focus:outline-none hover:bg-indigo-600">Assign Role</Link>
      <Link to="/admin/Coupons" className="flex justify-center w-48 px-4 py-2 mx-auto mt-2 text-lg text-white bg-blue-600 border-0 rounded focus:outline-none hover:bg-indigo-600">Coupon</Link>
      <Link to="/admin/wallets" className="flex justify-center w-48 px-4 py-2 mx-auto mt-2 text-lg text-white bg-blue-600 border-0 rounded focus:outline-none hover:bg-indigo-600">Wallets</Link>
      <p>WGK1S9</p>
    </section>
  );
};

export default AdminDash;
