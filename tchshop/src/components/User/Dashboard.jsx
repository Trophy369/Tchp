import UpdateProfile from "./UpdateProfile";
import {useSelector} from "react-redux"

const Dashboard = () => {
  const {user} = useSelector(state => state.user)


  return (
    <div>
      <h1>hey react</h1>
      {user}
      <UpdateProfile />
    </div>
  );
};

export default Dashboard;
