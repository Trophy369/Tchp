import { createContext, useContext, useState, useEffect } from "react";
import { signin, getUser } from "../../services";
import { getCart } from "../../services/userApi";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../../reducers/cartReducer";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const checkAuthStatus = async () => {
  //     try {
  //       const response = await getUser()
  //       if (response.id) {
  //         const data = await response;
  //         setUser(data);
  //       } else {
  //         setUser(null);
  //       }
  //     } catch (error) {
  //       console.error('Error checking auth status:', error);
  //       setUser(null);
  //     }
  //   };

  //   checkAuthStatus();
  // }, []);

  console.log(user);

  useEffect(() => {
    if (user) {
      const fetchProducts = async () => {
        dispatch(fetchCartItems())
      };

      fetchProducts();
    }
  }, [user]);

  const auth = async (email, password) => {
    const info = await signin(email, password);
    setUser(info);
    localStorage.setItem("user", JSON.stringify(info));
  };

  return (
    <AuthContext.Provider value={{ auth, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
