import React, { createContext, useEffect, useState } from 'react'
import axios from './axios'

export const ProductContext = createContext();
function Context(props) {
  const [products, setProducts] = useState(null)
  // useState(JSON.parse(localStorage.getItem("products")) || null)

   const getProducts = async() =>{
      try {
        const {data} = await axios.get('/products');
        setProducts(data);

      } catch (error) {
        console.log(error);
      }
   }
   
   useEffect(()=>{
      getProducts();
   },[])

  return (
    <ProductContext.Provider value={[products,setProducts]}> {props.children} </ProductContext.Provider>
  )
}

export default Context
