import React, { useContext,useEffect, useState } from 'react'
import Nav from './Nav'
import { Link, useLocation } from 'react-router-dom'
import {ProductContext } from '../utils/Context'
import Loading from './Loading'
import axios from '../utils/axios'

function Home() {
  const [Products] = useContext(ProductContext)
  const {search} = useLocation();
  const category = decodeURIComponent(search.split("=")[1]) 
  const [filterproducts, setfilterproducts] = useState(null);
  
  const getproductscategory = async() => {
    try {
      const {data} = await axios.get(`/products/category/${category}`)
      setfilterproducts(data)
    } catch (error) {
       console.log(error);
    }
  }

  useEffect(() => {
    if(!filterproducts || category == "undefined") setfilterproducts(Products)

    if(category != "undefined"){

      getproductscategory();
      setfilterproducts(Products.filter((p) => p.category == category))
      
    }
  }, [category, Products])


  return Products ? (
    <>
    <Nav/>

    <div className='h-screen w-[85%] p-10 pt-[5%] flex flex-wrap overflow-x-hidden overflow-y-auto '>

      {filterproducts && filterproducts.map((product,index) => (
        <Link key={product.id} to={`/details/${product.id}`} className='w-[18%] h-[30vh]  inset-shadow-sm shadow-xl p-3 rounded flex flex-col justify-center items-center mr-3 mb-3'>
          <div className='hover:scale-110 w-full h-[80%] bg-contain bg-no-repeat bg-center mb-3 ' style={{backgroundImage:`url(${product.image})`,}}>
          </div>
          <h1 className='hover:text-blue-300'>{product.title}</h1>
        </Link>
      ))}
    
    </div>
    </>
  ) : (
    <Loading/>
  );
}

export default Home
