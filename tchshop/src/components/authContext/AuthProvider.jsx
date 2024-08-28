import { createContext, useContext, useState, useEffect } from "react";
import { signin, getUser } from "../../services";
import { getCart } from "../../services/userApi";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../../reducers/cartReducer";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
<<<<<<< HEAD
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


//   useEffect(() => {
//     if (user) {
//         const fetchProducts = async () => {
//             console.log("Fetching cart items...");
//             await dispatch(fetchCartItems());
//         };

//         fetchProducts();
//     }
// }, [user, dispatch]);

  const auth = async (email, password) => {
    const info = await signin(email, password);
    setUser(info);
    localStorage.setItem("user", JSON.stringify(info));
=======
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await getUser();
        if (response.id) {
          setUser(response);
          localStorage.setItem("user", JSON.stringify(response)); // Persist user in localStorage
        } else {
          setUser(null);
          localStorage.removeItem("user");
        }
      } 
      catch (error) {
        console.error('Error checking auth status:', error);
        setUser(null);
        localStorage.removeItem("user");
      }
    };

    checkAuthStatus();
  }, []);

  const auth = async (email, password) => {
    setLoading(true); // Set loading to true when starting authentication
    try {
      const { data, error } = await signin(email, password);
      if (error) {
        throw new Error(error);
      }
      setUser(data); 
      localStorage.setItem("user", JSON.stringify(data));
      setError(null);
    } catch (error) {
      console.error("Authentication error:", error);
      setUser(null);
      localStorage.removeItem("user");
      setError(error.message);
      setTimeout(() => {
        setError(null);
      }, 5000);
    } finally {
      setLoading(false);
    }
  };  

  const logOut = async () => {
    await signout(() => {
      setUser(null);
      localStorage.removeItem("user");
    });
>>>>>>> 6c8515be898ddd2e8ff2c16370f7a63a0ff542c1
  };

  return (
<<<<<<< HEAD
    <AuthContext.Provider value={{ auth, user }}>
=======
    <AuthContext.Provider value={{ auth, user, error, loading, logOut }}>
>>>>>>> 6c8515be898ddd2e8ff2c16370f7a63a0ff542c1
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
