import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
  


const MobileNav = () => {
  const role = useSelector((state) => state.auth.role);
  return ( <>
{role === "user" && (
  <div className='w-full flex items-center justify-center'>
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
)}
{role==="admin" && <div>
  <div className='w-full flex items-center justify-center'>
  <Link
    to="/profile/favourites"
    className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300">
    All orders
  </Link>
  <Link
    to="/profile/addBook"
    className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300">
    Add Book
  </Link>
</div>
  </div>}
</>
)

}


export default MobileNav;