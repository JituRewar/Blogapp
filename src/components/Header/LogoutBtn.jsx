// import React from 'react'
// import {useDispatch} from 'react-redux'
// import authService from '../../appwrite/auth'
// import {logout} from '../../store/authSlice'

// function LogoutBtn() {
//     const dispatch = useDispatch()
//     const logoutHandler = () => {
//         authService.logout().then(() => {
//             dispatch(logout())
//         })
//     }
//   return (
//     <button
//     className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
//     onClick={logoutHandler}
//     >Logout</button>
//   )
// }

// export default LogoutBtn

import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import authService from "../../appwrite/auth";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout(); // 1️⃣ remove Appwrite session
      dispatch(logout());         // 2️⃣ clear redux
      navigate("/");              // 3️⃣ go to HOME
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-6 py-2 text-white bg-red-500 rounded-full hover:bg-red-600 duration-200"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
