import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../utils/Context'
import { useNavigate, useParams } from 'react-router-dom'
import {nanoid} from 'nanoid'
import { toast } from 'react-toastify'
 
function Edit() {
  const[products,setProducts] = useContext(ProductContext)
  const {id} = useParams();
  const navigate = useNavigate();
  const [product, setproduct] = useState({
    title : '',
    image : '',
    category : '',
    price : '',
    description : '',
  }); 

  useEffect(() => {
    setproduct(products.filter(p => p.id == id)[0])
  }, [id])

  const changehandler = (e) => {
    console.log(e.target.name , e.target.value)
    setproduct({...product, [e.target.name]: e.target.value})
  }

  const Editbuttonhandler = (e) => {
    e.preventDefault();

    if(product.title.trim().length < 5 || product.image.trim().length < 5 || product.category.trim().length < 5 || product.price.trim().length < 2 || product.description.trim().length < 5 ) { 
        alert("each and every field must be greater than zero.");
        return;
    }

    const pi = products.findIndex(p => p.id == id)
    const copyData = [...products] 
    copyData[pi] = {...products[pi], ...product}
    setProducts(copyData)
    localStorage.setItem("products", JSON.stringify(copyData))
    toast.success('Product Edited Successfully!')
    navigate(-1)

    // const Product = {id:nanoid(),  title, image, category, price, description}
    // setProducts([...products, Product])
    // localStorage.setItem("products" , JSON.stringify([...products, Product]))
    // navigate('/')
  }

  return (
    <div>
      <form onSubmit={Editbuttonhandler} className='p-[5%] w-screen h-screen flex flex-col items-center'>
        <h1 className='text-3xl w-1/2 mb-5'>Edit Product</h1>
        <input 
        type="url" 
        placeholder="image" 
        className='text-xl bg-zinc-100 rounded p-3 w-1/2 mb-3'
        name='image'
        onChange={changehandler}
        value={product && product.image}
        />

        <input 
        type="text" 
        placeholder="title" 
        className='text-xl bg-zinc-100 rounded p-3 w-1/2 mb-3'
        name='title'
        onChange={changehandler}
        value={product && product.title}
        />

        <div className='flex justify-between w-1/2'>
        <input 
        type="text" 
        placeholder="category" 
        className='text-xl bg-zinc-100 rounded p-3 w-[48%] mb-3'
        name='category'
        onChange={changehandler}
        value={product && product.category} />

        <input 
        type="text" 
        placeholder="price" 
        className='text-xl bg-zinc-100 rounded p-3 w-[48%] mb-3'
        name='price'
        onChange={changehandler}
        value={product && product.price} />

        </div>

        <textarea 
        placeholder="Add product description here..." 
        className='text-xl bg-zinc-100 rounded p-3 w-1/2 mb-3'
        rows="10"
        name='description'
        onChange={changehandler}
        value={product && product.description}
        />

        <div className='w-1/2'><button className='py-3 px-5 border rounded border-blue-400 text-blue-400'>Edit Product</button></div>
      </form>

    </div>
  )
}

export default Edit
