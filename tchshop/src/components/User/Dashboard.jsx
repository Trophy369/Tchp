import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const {user} = useSelector((state) => state.user);

  return (
    <section className="p-4 mx-auto mt-11 mb-44 max-w-7xl bg-gray-50">
      <div className="flex flex-col items-center mb-8">
        <h1 className="mb-4 text-3xl font-bold text-center">Dashboard</h1>
        <div className="flex flex-col items-center mb-8">
          <p className="text-lg font-medium text-gray-600">Welcome, <span className="text-gray-900">{user.username}</span></p>
          <p className="text-lg text-gray-600">Email: <span className="text-gray-900">{user.email}</span></p>
        </div>
      </div>
      <nav className="flex flex-col items-center space-y-4">
        <Link
          to={"/update"}
          className="px-4 py-2 text-gray-600 transition duration-300 bg-gray-200 rounded-md hover:bg-gray-300 hover:text-gray-900"
        >
          Update Shipping Address
        </Link>
        <Link
          to={"/orders"}
          className="px-4 py-2 text-gray-600 transition duration-300 bg-gray-200 rounded-md hover:bg-gray-300 hover:text-gray-900"
        >
          Orders
        </Link>
      </nav>
    </section>
  );
};

export default Dashboard;
