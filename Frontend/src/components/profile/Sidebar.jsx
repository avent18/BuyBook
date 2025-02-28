/** @format */

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { authActions } from "../../Store/auth";
import { useDispatch, useSelector } from "react-redux";


const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const role = useSelector((state) => state.auth.role);
  return (
    <div className="bg-zinc-800 p-4 rounded flex flex-col items-center justify-center h-[100%]">
      <div className=" flex flex-col items-between justify-between">
        {" "}
        <img src={data.avatar} className="h-[12vh]" />
        <p className="mt-3 text-xl text-zinc-100 font-semibold">
          {data.username}
        </p>
        <p className="mt-1 text-zinc-300">{data.email}</p>
        <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"></div>
      </div>
      {
        role === "role" && (
          <div className="w-full flex-col items-center justify-center hidden lg:flex">
        <Link
          to="/profile/favourites"
          className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300">
          Favourites
        </Link>
        <Link
          to="/profile/orderHistory"
          className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300">
          Order History
        </Link>
        <Link
          to="/profile/settings"
          className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300">
          Settings
        </Link>
      </div>
        )
      }
      
      <button 
      onClick={()=>{
        dispatch(authActions.logout());
        dispatch(authActions.changeRole("user"));
        localStorage.clear("id");
        localStorage.clear("token");
        localStorage.clear("role");
        history("/");
      }}
      className="bg-zinc-900 rounded w-3/6 lg:w-full mt-4 lg:mt-3 text-white font-semibold flex items-center justify-center hover:bg-green-950">
      Log Out <FaArrowRightFromBracket className="ms-4" />
      </button>

    </div>
  );
};

export default Sidebar;
