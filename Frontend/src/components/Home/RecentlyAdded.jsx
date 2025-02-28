/** @format */

import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";
import Loader from "../Loader/Loader";

const RecentlyAdded = () => {
  const [Data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/v1//getallbooks"
      );
      setData(response.data);
    };
    fetch();
  }, []);

  return (
    <div className="mt-8 px-4">
      <h4 className="text-3xl text-zinc-300">Recently added Books</h4>
      {!Data && <div className="items-center justify-between my-8"><Loader /></div> }
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

export default RecentlyAdded;
