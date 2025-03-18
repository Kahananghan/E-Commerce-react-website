import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from '../utils/axios'
import Loading from './Loading';
import { ProductContext } from '../utils/Context';
import { toast } from 'react-toastify';


function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setproduct] = useState(null);
  const[products,setProducts] = useContext(ProductContext)

  // const getsingleproduct = async() => {
  //   try {
  //     const  {data} = await axios.get(`/products/${id}`)
  //     setproduct(data);
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  useEffect(() => {
    // getsingleproduct()
    if(!product) {
      setproduct(products.filter((p) => p.id == id)[0])
    }
  }, [])

  const deleteproducthandler = (id) => {
    const deleteproduct = products.filter((p) => p.id != id)
    setProducts(deleteproduct)
    localStorage.setItem("products", JSON.stringify(deleteproduct))
    toast.success('Product Deleted Successfully')
    navigate('/')
  }

  return product ? (
    <>
    <div className='h-full w-[70%] m-auto flex justify-between items-center p-[10%]'>

        <img className='object-contain w-[40%] h-[80%]' src={`${product.image}`}  />

        <div className='content w-[50%]'>
          <h1 className='text-4xl'>{product.title}</h1>
          <h3 className='text-zinc-400 my-5'>{product.category}</h3>
          <h2 className='text-red-300 mb-3'>{"$ "}{product.price}</h2>
          <p className='mb-[8%]'>{product.description}</p>

          <Link to={`/edit/${product.id}`} className='py-3 px-5 border rounded border-blue-200 text-blue-300 mr-3'>Edit</Link>

          <button onClick={() => deleteproducthandler(product.id)} className='py-3 px-5 border rounded border-red-200 text-red-300'>Delete</button>
        </div>
      
    </div> 
    </>
  ) : (
    <Loading />
  );
}

export default Details
