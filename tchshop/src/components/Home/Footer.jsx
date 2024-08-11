import React from 'react'
import { AiFillTikTok } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { IoMdCall } from "react-icons/io";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer
    className='content-center   w-[100%]  bottom-0 mt-2 bg-zinc-300/50 '>
        <div  className='flex flex-row justify-around py-2 ' >
        <AiFillTikTok className="w-6 h-6 " /> 
        <AiFillInstagram className="w-6 h-6 " />
        <MdEmail className="w-6 h-6 " />
        <IoMdCall className="w-6 h-6 " />
        <Link to="/admin">logoo</Link>
    </div>
    <div
    className='py-1 font-semibold text-center'
    >
         <small>&copy; Copyright 2024, TchShop</small>
    </div>
       
    </footer>
    
  )
}

export default Footer