import React from 'react'
import { Link } from 'react-router-dom';

const BookCard = ({data, favourite}) => {
  const headers = {
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
    bookId:data._id,
  };
  const handleRemoveBook = async () => {
    const response = await axios.put("http://localhost:3000/api/v1/deletefavourites",{},{headers});
    alert(response.data.message);
  }
  
  return <>
  <Link to={`/view-book-details/${data._id}`}>
  <div className='bg-zinc-800 rounded p-4'>
    <div className='bg-slate-900 rounded flex items-center justify-center'>
      <img src="{data.url}" alt="" className='h-[25vh]' />
    </div>
    <h2 className='mt-4 text-xl text-zinc-300'>{data.title}</h2>
    <p className='mt-2 text-zinc-200 font-semibold'>by {data.author}</p>
    <p className='mt-2 text-zinc-200 font-semibold'>₹{data.price}</p>
  </div>
  </Link>
  {favourite && (
    <button className='bg-yellow-200 px-4 py-2 rounded border-yellow-500'
    onClick={handleRemoveBook}>
      Remove from favourite
    </button>
  )

  }
  </>
}

export default BookCard;