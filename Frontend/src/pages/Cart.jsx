import React, { useState, useEffect } from 'react'
import Loader from '../components/Loader/Loader';
import axios from 'axios';
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';


const Cart = () => {
  const navigate = useNavigate();
  const [Cart, setCart] = useState();
  const [Total, setTotal] = useState(0);
  const headers = {
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`
  };

  useEffect(()=>{
    const fetch = async () => {
      const res = await axios.get(
        'http://localhost:3000/api/v1//getcart',{headers}
      );
      setCart(res.data.data);
    };
    fetch();
  }, [Cart]);
  const deleteItem = async (bookid) => {
    const response = await axios.put(`http://localhost:3000/api/v1//getcart/${bookid}`,{}, {headers}

    );
    alert(response.data.message)
  };
  useEffect(()=>{
    if(Cart && Cart.length>0){
      let Total = 0;
      Cart.map((items,i)=>{
       Total += items.price;
      });
      setTotal(Total);
      Total=0;
    }
  }, [Cart]);

  const placeOrder = async () => {
    try {
      response = await axios.post(
        'http://localhost:3000/api/v1/placeOrder',{order:Cart}, {headers}
      );
      alert(response.data.message);
      Navigate("/profile/orderHistory");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    {!Cart && <Loader />}
    {Cart && Cart.length === 0 && (
      <div className='h-screen'>
        <div className='h-[100%} flex items-center flex-col'>
          <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-400'>
            Empty Cart
          </h1>
          <img 
          src="" 
          alt="" 
          className='lg:h-[50vh]'/>
        </div>
      </div>
    )}
    {
      Cart && Cart.length > 0 && (
        <>
        <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>
        Your Cart  
        </h1>
        {Cart.map((items, i ) =>{
          <div className='w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800'>
            <img src={items.url} alt=""
            className='h-[20vh] md:h-[10vh] object-cover' />
            <div>
              <h1 className='text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0'>{items.title}</h1>
              <p className='text-normal text-zinc-300 mt-2 hidden lg:block'>
                {items.desc.slice(0,100)}...
              </p>
              <p className='text-normal text-zinc-300 mt-2 hidden md:block lg:hidden'>
                {items.desc.slice(0,65)}...
              </p>
              <p className='text-normal text-zinc-300 mt-2 hidden lg:block'>
                {items.desc.slice(0,100)}...
              </p>
            </div>
            <div className='flex flex-col md:flex-row items-center justify-between'>
              <h2 className='text-zinc-100 text-3xl font-semibold'>{items.price}</h2>
              <button className='bg-red-100 text-red-700 border-red-200 p-2 ms-12' onClick={deleteItem}>
              <AiFillDelete />
              </button>
            </div>
          </div>
        })}
        </>
      )};
      {Cart && Cart.length>0 && (
        <div className='mt-4 w-full items-center justify-center'>
        <div className='p-4 bg-zinc-800 rounded'>
          <h1>Total Amount</h1>
          <div className='mt-1 flex items-center justify-between text-xl text-zinc-200'>
          <h2>{Cart.length} books</h2> <h2>{Total}</h2>
          </div>
          <div className='w-full mt-3'>
          <button className='bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font font-semibold' onClick={placeOrder}>
          Place Your order
          </button>
          </div>
        </div>
        </div>
      
      )}
    </>
  )
}

export default Cart;

