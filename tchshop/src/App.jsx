import { 
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import HomePage from './components/Home/HomePage';
import CartPage from './components/Cart/CartPage';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import UpdateProfile from './components/User/UpdateProfile';
import Shipping from './pages/shoppolicy/Shipping'
import Warranty from './pages/shoppolicy/Warranty';
import Returns from './pages/Returns';
import ProductPro from './components/Products/ProductPro';
import AdminDash from './components/Admin/AdminDash';
import AddProduct from './components/Admin/AddProducts';
import CreateRole from './components/Admin/CreateRole';
import AssignRole from './components/Admin/AssignRole';
import CreateReview from './components/Admin/CreateReview';
import CreateCategory from './components/Admin/CreateCategory';
import AssignCategory from './components/Admin/AssignCategory';
import Dashboard from './components/User/Dashboard';
import Checkout from './components/Cart/Checkout';
import Faq from './pages/Faq'

const router = createBrowserRouter(
     createRoutesFromElements(
      <Route path='/' element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/admin' element={<AdminDash />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/admin/addproduct' element={<AddProduct />} />
        <Route path='/admin/createcategory' element={<CreateCategory />} />
        <Route path='/admin/createReview' element={<CreateReview />} />
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
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/faq' element={<Faq />} />
      </Route>
      
     )
);

const App = () => {
  return <RouterProvider router={router} />
};
export default App