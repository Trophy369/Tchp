import { Outlet } from "react-router-dom";
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";
import { useDispatch, useSelector } from "react-redux";
import {useAuth} from "../components/authContext/AuthProvider"
import { useEffect } from "react";
import { fetchCartItems } from "../reducers/cartReducer";


const DefaultLayout = () => {

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default DefaultLayout;
