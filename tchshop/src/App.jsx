import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import AdminRoutes from "./components/Auth/AdminRoutes";
import UserRoutes from "./components/Auth/UserRoutes";
import HomePage from "./components/Home/HomePage";
import CartPage from "./components/Cart/CartPage";
import SignIn from "./components/Auth/SignIn";
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
import AssignRole from "./components/Admin/AssignRole";
import CreateReview from "./components/Admin/CreateReview";
import CreateCategory from "./components/Admin/CreateCategory";
import Dashboard from "./components/User/Dashboard";
import Checkout from "./components/Cart/Checkout";
import Faq from "./pages/Faq";
import Flipperzero from './components/collections/Flipperzero';
import Hak5 from './components/collections/Hak5';
import Pentesting from './components/collections/Pentesting';
import Sdr from './components/collections/Sdr';
import Rftools from './components/collections/Rftools';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<DefaultLayout />}>
      <Route index element={<HomePage />} />
      <Route element={<UserRoutes />}>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/update" element={<UpdateProfile />} />
        <Route path="/checkout" element={<Checkout />} />
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
      </Route>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/viewproduct/:id" element={<ProductPro />} />
      <Route path="/shoppolicy/shipping" element={<Shipping />} />
      <Route path="/shoppolicy/returns" element={<Returns />} />
      <Route path="/shoppolicy/warranty" element={<Warranty />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="collections/flipper-zero" element={<Flipperzero />} />
      <Route path="collections/hak5" element={<Hak5 />} />
      <Route path="collections/pentesting" element={<Pentesting />} />
      <Route path="collections/sdr" element={<Sdr />} />
      <Route path="collections/rf-tools" element={<Rftools />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
