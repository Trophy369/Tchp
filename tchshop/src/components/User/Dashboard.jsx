import UpdateProfile from "./UpdateProfile";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <section className="px-4 py-4 my-8 bg-gray-50 sm:px-6 lg:px-8">
      <Link to={"/update"}>Update Profile</Link>
      <Link to={"/orders"}>orders</Link>
    </section>
  );
};

export default Dashboard;
