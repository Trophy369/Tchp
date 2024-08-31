import { createContext, useContext, useState, useEffect } from "react";
import { signin, getUser } from "../../services";
import { getCart } from "../../services/userApi";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../../reducers/cartReducer";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
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
  };

  return (
    <AuthContext.Provider value={{ auth, user, error, loading, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
