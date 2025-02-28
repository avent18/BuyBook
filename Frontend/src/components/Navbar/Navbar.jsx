/** @format */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "All Books",
      link: "/all-books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "profile",
      link: "/profile",
    },
    {
      title: "Admin Profile",
      link: "/profile",
    },
  ];
  const isloggedIn = useSelector((state)=> state.auth.isloggedIn);
  const role = useSelector((state) => state.auth.role);
  if (isloggedIn === true && role === 'admin'){
    links.splice(3,1);
  }
  if (isloggedIn === true && role === 'user'){
    links.splice(4,1);
  }

  if (isloggedIn === false ){
    links.splice(2,2);
  }
  
  const [mobileNav, setMobilenav] = useState("hidden");

  return (
    <>
      <nav className="z-50 relative bg-zinc-800 text-white px-8 py-4 flex items-center justify-between ">
        <Link to="/" className="flex items-center">
          <img className="h-10 me-4" src="../ebook.png" alt="book" />
          <h1 className="text-2xl font-bold">BookShop</h1>
        </Link>
        <div className="nav-links-BookShop block md:flex items-center gap-4 ">
          <div className="hidden md:flex gap-4">
            {links.map((items, i) => (
              <div className="flex items-center">
              {items.title === "profile" || items.title === "Admin Profile" ? <Link
              to={items.link}
              className=" border border-green-600 transition-all duration-300"
              key={i}
              >{items.title}
              </Link>:
              <Link
              to={items.link}
              className="hover:text-green-600  transition-all duration-300"
              key={i}>
                {items.title}
              </Link>
              }           
              </div>
            ))}
          </div>
          {isloggedIn===false && <>
        <Link
          to="/LogIn"
          className={`${mobileNav} px-6 py-2 mb-4  border border-green-700 rounded hover:text-green-700 hover:bg-gray-900 transition-all duration-300`}>
          LogIn
        </Link>
        <Link
          to="/SignUp"
          className={`${mobileNav} px-6 py-2 mb-4 bg-green-700 rounded hover:bg-gray-900 hover:text-green-700 transition-all duration-300`}>
          SignUp
        </Link>
        </>}
          <button
            className=" block md:hidden text-white text-2xl hover:text-zinc-400"
            onClick={() => {
              mobileNav === "hidden"
                ? setMobilenav("block")
                : setMobilenav("hidden");
            }}>
            <FaBars />
          </button>
        </div>
      </nav>
      <div
        className={`${mobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center text-zinc-200 text-4xl`}>
        {links.map((items, i) => (
          <Link
            to={items.link}
            className={`${mobileNav} hover:text-green-600 mb-4 transition-all duration-300`}
            key={i}
            onClick={() => {
              mobileNav === "hidden"
                ? setMobilenav("block")
                : setMobilenav("hidden")
            }}>
            {items.title}{" "}
          </Link>
        ))}
        {/* <div className='hidden md:flex gap-4'> */}
        {isloggedIn===false && <>
        <Link
          to="/LogIn"
          className={`${mobileNav} px-6 py-2 mb-4  border border-green-700 rounded hover:text-green-700 hover:bg-gray-900 transition-all duration-300`}>
          LogIn
        </Link>
        <Link
          to="/SignUp"
          className={`${mobileNav} px-6 py-2 mb-4 bg-green-700 rounded hover:bg-gray-900 hover:text-green-700 transition-all duration-300`}>
          SignUp
        </Link>
        </>}
      </div>
    </>
  );
};

export default Navbar;
