/** @format */

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { GrLanguage } from "react-icons/gr";
import Loader from "../Loader/Loader";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";

const ViewBookDetails = () => {
  const { id } = useParams();

  const [Data, setData] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/v1//get-book-by-id/${id}`
      );
      console.log(response);
      setData(response.data.data);
    };
    fetch();
  }, []);

  const headers = {
    id: localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
    bookId:id,
  };

  const handleFavourites = async () => {
    const response = await axios.put("http://localhost:3000/api/v1/addfavouritebooks", {}, {headers});
    alert(response.data.message);
  };
  

  const handleCart = async () => {
    const response = await axios.put("http://localhost:3000/api/v1/addtocart", {}, {headers});
    alert(response.data.message);
  };

  console.log(response.data.message);

  return (
    <>
      {Data && (
        <div className="px-8 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row  gap-8">
          <div className="bg-zinc-800 rounded p-4 h-[60vh] lg:h-[88vh] w-full lg:w-3/6  items-center justify-center">
            <div className="flex flex-col lg:flex-row justify-around bg-zinc-800 p-12 rounded">
              <img src={Data.url} className="h-[50vh] lg:h-[70vh] rounded" />
              {isLoggedIn === true && role === "user" && (
                <div className="flex flex-row lg:flex-col lg:mt-0">
                  <button className="bg-white rounded-full text-2xl p-2" onClick={handleFavourites}>
                    <FaHeart /><span>Add to favourites</span>
                  </button>
                  <button className="bg-white rounded-full text-2xl p-2 mt-5" onClick={handleCart}>
                    <FaShoppingCart /><span>Add to cart</span>
                  </button>
                </div>
              )}
              {isLoggedIn === true && role === "admin" && (
                <div className="flex flex-row lg:flex-col lg:mt-0">
                  <button className="bg-white rounded-full text-2xl p-2">
                  <FaEdit />
                  </button>
                  <button className="bg-white rounded-full text-2xl p-2 mt-5">
                  <MdDeleteOutline />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="p-4 w-full lg:w-3/6">
            <h1 className="text-4xl text-zinc-300 font-semibold">
              {Data.title}
            </h1>
            <p className="text-zinc-400 mt-1"> by {Data.author}</p>
            <p className="text-zinc-500 mt-4 text-xl">{Data.desc}</p>
            <p className="flex mt-4 items-center justify-start text-zinc-400">
              <GrLanguage className="me-3" />
              {Data.language}
            </p>
            <p>price: ₹{Data.price}</p>
          </div>
        </div>
      )}
      {!Data && (
        <div className="h-screen bg-zinc-900 items-center justify-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
