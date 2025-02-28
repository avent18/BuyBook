import React, { useEffect, useState } from 'react'
import BookCard from '../BookCard/BookCard';

const Favourites = () => {
  const [FavouriteBooks, setFavouriteBooks] = useState();
  const headers = {
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(()=>{
    const fetch = async () =>{
      const response = await axios.get('http://localhost:3000/api/v1/profile/favourites', {headers});
      setFavouriteBooks(response.data.data);
    };
    fetch();
  },[FavouriteBooks]);
  return (
    <div className='grid grid-cols-4 gap-4'>
      { FavouriteBooks && FavouriteBooks.length === 0 && 
      <p>No favourite books</p>}
      {FavouriteBooks && Favourites.map((items, i) => {
        <div key={i}>
        <BookCard data={items} favourite={true}/>
        </div>
      })}
    </div>
  )
}

export default Favourites;