import { 
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import UpdateProfile from './components/User/UpdateProfile';
import Shipping from './pages/shoppolicy/Shipping'
import Warranty from './pages/shoppolicy/Warranty';
import Returns from './pages/Returns';
import ProductPro from './components/ProductPro';
import AdminDash from './components/Admin/AdminDash';
import AddProduct from './components/Admin/AddProducts';
import CreateRole from './components/Admin/CreateRole';
import AssignRole from './components/Admin/AssignRole';
import CreateCategory from './components/Admin/CreateCategory';
import AssignCategory from './components/Admin/AssignCategory';
import Dashboard from './components/User/Dashboard';
import Checkout from './components/Checkout';

const router = createBrowserRouter(
     createRoutesFromElements(
      <Route path='/' element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/admin' element={<AdminDash />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/admin/addproduct' element={<AddProduct />} />
        <Route path='/admin/createcategory' element={<CreateCategory />} />
        <Route path='/admin/createrole' element={<CreateRole />} />
        <Route path='/admin/assignrole' element={<AssignRole />} />
        <Route path='/admin/assigncategory' element={<AssignCategory />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/update' element={<UpdateProfile />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/viewproduct/:id' element={<ProductPro />} />
        <Route path='/shoppolicy/shipping' element={<Shipping />} />
        <Route path='/shoppolicy/returns' element={<Returns />} />
        <Route path='/shoppolicy/warranty' element={<Warranty />} />
        <Route path='/Checkout' element={<Checkout />} />
      </Route>
      
     )
);

const App = () => {
  return <RouterProvider router={router} />
};
export default App