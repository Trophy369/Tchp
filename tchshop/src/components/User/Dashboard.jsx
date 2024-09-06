import {useSelector} from "react-redux"
import {Link} from "react-router-dom"

const Dashboard = () => {
  const {user} = useSelector(state => state.user)

  return (
    <div>
      <h1>hey react</h1>
      {user.email}
      <br />
      <Link to={"/update"}>Update Shipping</Link>
      <br />
      <Link to={"/orders"}>Orders</Link>
    </div>
  );
};

export default Dashboard;
