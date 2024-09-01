import { useEffect } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "./layouts/DefaultLayout";
import AdminRoutes from "./components/Auth/AdminRoutes";
import UserRoutes from "./components/Auth/UserRoutes";
import HomePage from "./components/Home/HomePage";
import CartPage from "./components/Cart/CartPage";
import Payment from "./components/Cart/Payment";
import SignIn from "./components/Auth/SignIn";
import ForgotPassword from "./components/Auth/ForgotPassword";
import SignUp from "./components/Auth/SignUp";
import UpdateProfile from "./components/User/UpdateProfile";
import Shipping from "./pages/shoppolicy/Shipping";
import Warranty from "./pages/shoppolicy/Warranty";
import Returns from "./pages/Returns";
import ProductPro from "./components/Products/ProductPro";
import AdminDash from "./components/Admin/AdminDash";
import AddProduct from "./components/Admin/AddProducts";
import Product from "./components/Admin/Product";
import CreateProduct from "./components/Admin/CreateProduct";
import CreateRole from "./components/Admin/CreateRole";
import Coupon from "./components/Admin/Coupon";
import Wallets from "./components/Admin/Wallets";
import AssignRole from "./components/Admin/AssignRole";
import CreateReview from "./components/Admin/CreateReview";
import CreateCategory from "./components/Admin/CreateCategory";
import Dashboard from "./components/User/Dashboard";
import Checkout from "./components/Cart/Checkout";
import Faq from "./pages/Faq";
import CategoryPage from "./components/collections/CategoryPage";
import { checkAuthStatusAsync } from "./reducers/userReducer";
import { fetchCartItems } from "./reducers/cartReducer";
import SignUp2 from "./components/Auth/SignUp2";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<DefaultLayout />}>
      <Route index element={<HomePage />} />
      <Route element={<UserRoutes />}>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/update" element={<UpdateProfile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
      </Route>
      {/* <Route path='/colors' element={<Colors />} /> */}
      <Route element={<AdminRoutes />}>
        <Route path="/admin" element={<AdminDash />} />
        <Route path="/admin/addproduct" element={<AddProduct />} />
        <Route path="/admin/product/:id" element={<Product />} />
        <Route path="/admin/createproduct" element={<CreateProduct />} />
        <Route path="/admin/createcategory" element={<CreateCategory />} />
        <Route path="/admin/createReview" element={<CreateReview />} />
        <Route path="/admin/createrole" element={<CreateRole />} />
        <Route path="/admin/assignrole" element={<AssignRole />} />
        <Route path="/admin/coupons" element={<Coupon />} />
        <Route path="/admin/wallets" element={<Wallets />} /> 
        <Route path="/admin/createShipping" element={<CreateShipping />} />
      </Route>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/viewproduct/:id" element={<ProductPro />} />
      <Route path="/shoppolicy/shipping" element={<Shipping />} />
      <Route path="/shoppolicy/returns" element={<Returns />} />
      <Route path="/shoppolicy/warranty" element={<Warranty />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="collections/:name" element={<CategoryPage />} />
      <Route path="/:refCode" element={<SignUp2 />} />
    </Route>
  )
);

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);

  useEffect(() => {
    if (user !== null) {
      dispatch(checkAuthStatusAsync());
    }
  }, [dispatch]);

  useEffect(() => {
    if (user !== null) {
      dispatch(fetchCartItems());
    }
  }, [user, dispatch]);

  return <RouterProvider router={router} />;
};
export default App;
