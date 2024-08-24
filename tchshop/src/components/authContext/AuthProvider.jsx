import { createContext, useContext, useState, useEffect } from "react";
import { signin, getUser, signout } from "../../services";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));

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
      } catch (error) {
        console.error('Error checking auth status:', error);
        setUser(null);
        localStorage.removeItem("user");
      }
    };

    checkAuthStatus();
  }, []);

  const auth = async (email, password) => {
    try {
      const info = await signin(email, password);
      setUser(info);
      localStorage.setItem("user", JSON.stringify(info));
    } catch (error) {
      console.error("Authentication error:", error);
      setUser(null);
      localStorage.removeItem("user");
    }
  };

  const logOut = async () => {
    await signout(() => {
      setUser(null);
      localStorage.removeItem("user");
    });
  };
  

  return (
    <AuthContext.Provider value={{ auth, user, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
