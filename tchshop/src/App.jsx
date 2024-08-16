import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
// import AdminRoutes from "./components/Auth/AdminRoutes"; 
// import UserRoutes from "./components/Auth/UserRoutes";
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
import CreateRole from "./components/Admin/CreateRole";
import AssignRole from "./components/Admin/AssignRole";
import CreateReview from "./components/Admin/CreateReview";
import CreateCategory from "./components/Admin/CreateCategory";
import AssignCategory from "./components/Admin/AssignCategory";
import Dashboard from "./components/User/Dashboard";
import Checkout from "./components/Cart/Checkout";
import Faq from "./pages/Faq";
// import Colors from "./components/Admin/Colors"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<DefaultLayout />}>
      <Route index element={<HomePage />} />
      {/* <Route element={<UserRoutes />}> */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/update" element={<UpdateProfile />} />
        <Route path="/checkout" element={<Checkout />} />
      {/* </Route> */}
      {/* <Route path='/colors' element={<Colors />} /> */}
      {/* <Route element={<AdminRoutes />}> */}
        <Route path="/admin" element={<AdminDash />} />
        <Route path="/admin/addproduct" element={<AddProduct />} />
        <Route path="/admin/createcategory" element={<CreateCategory />} />
        <Route path="/admin/createReview" element={<CreateReview />} />
        <Route path="/admin/createrole" element={<CreateRole />} />
        <Route path="/admin/assignrole" element={<AssignRole />} />
        <Route path="/admin/assigncategory" element={<AssignCategory />} />
      {/* </Route> */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/viewproduct/:id" element={<ProductPro />} />
      <Route path="/shoppolicy/shipping" element={<Shipping />} />
      <Route path="/shoppolicy/returns" element={<Returns />} />
      <Route path="/shoppolicy/warranty" element={<Warranty />} />
      <Route path="/faq" element={<Faq />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
