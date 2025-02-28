/** @format */

import React from "react";
import Loader from "../components/Loader/Loader";
import BookCard from "../components/BookCard/BookCard";
import axios  from "axios";
import { useState, useEffect } from "react";

const AllBooks = () => {
   
  const [Data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/v1/getBooks"
      );
      setData(response.data.data);
    };
    fetch();
  }, []);

  return (
    <div className="bg-zinc-800 h-auto px-12 py-8">
      <h4 className="text-3xl text-zinc-300">All Books</h4>
      {!Data && (
        <div className="items-center justify-between my-8">
          <Loader />
        </div>
      )}
      <div className="my-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Data && Data.length > 0 ? (
          Data.map((items, i) => (
            <div key={i}>
              <BookCard data={items} />
            </div>
          ))
        ) : (
          <p className="text-red-500">No Books Available</p>
        )}
      </div>
    </div>
  );
};

export default AllBooks;
