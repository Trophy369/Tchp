import { createContext, useContext, useState, useEffect } from "react";
import { signin } from "../../services";
import { getCart } from "../../services/userApi";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [itemTotal, setItemTotal] = useState(0);

  useEffect(() => {
    if (user) {
      const fetchProducts = async () => {
        const data = await getCart(user.id);
        setItemTotal(data[0]['Number of items']);
      };

      fetchProducts();
    }
  }, [user]);

  // const userData = () => {
  //   if (user) {
  //     useEffect(() => {
  //       const fetchProducts = async () => {
  //         const data = await getCart(user.id);
  //         setCart(data);
  //       };

  //       fetchProducts();
  //     }, []);
  //   }
  // };

  const auth = async (email, password) => {
    const info = await signin(email, password);
    setUser(info);
    localStorage.setItem("user", JSON.stringify(info));
  };

  // if (user !== null) {
  //   console.log(user);
  // }

  return (
    <AuthContext.Provider value={{ auth, user, itemTotal }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
