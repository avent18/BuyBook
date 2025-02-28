import React from 'react'
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className=' h-[75vh] flex flex-col md:flex-row items-center justify-center'>
      <div className='w-full mb-8 md:mb-0 lg:w-3/6 flex flex-col items-center lg:items-start justify-center'>
        <h1 className='text-4xl lg:text-6xl font-semibold text-yellow-100 lg:text-left'>
        Fuel Your Mind, One Book at a Time.
          </h1>
        <p className='mt-4  text-xl text-zinc-300 text-center lg:text-left'>
        Books are more than just stories—they are fuel for the mind,
         igniting curiosity, knowledge, and imagination. Let every page turn be a step toward growth and discovery! 📖✨
        </p>
        <div className='mt-8'>
        <Link to="/all-books" className='text-yellow-100 text-xl lg:text-2xl font-semibold border border-yellow-100 px-10 py-3 hover:bg-zinc-800 rounded-full'>
          Explore Books..
        </Link>
        </div>
      </div>
      <div className='w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center'>
      <img src="./hero.png" alt="hero" />
      </div>
    </div>
  )
}

export default Hero;