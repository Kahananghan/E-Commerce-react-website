import React, { useContext, useState } from 'react'
import { ProductContext } from '../utils/Context'
import { useNavigate } from 'react-router-dom'
import {nanoid} from 'nanoid'
import { toast } from'react-toastify';
function Create() {
  const[products,setProducts] = useContext(ProductContext)
  const [title,settitle] = useState("")
  const [image,setimage] = useState("")
  const [category,setcategory] = useState("")
  const [price,setprice] = useState("")
  const [description,setdescription] = useState("")
  const navigate = useNavigate();

  const Addproducthandler = (e) => {
    e.preventDefault();

    if(title.trim().length < 5 || image.trim().length < 5 || category.trim().length < 5 || price.trim().length < 2 || description.trim().length < 5 ) { 
        alert("each and every field must be greater than zero.");
        return;
    }

    const Product = {id:nanoid(),  title, image, category, price, description}
    setProducts([...products, Product])
    localStorage.setItem("products" , JSON.stringify([...products, Product]))
    toast.success("Product Added Successfully")
    navigate('/')
  }

  return (
    <div>
      <form onSubmit={Addproducthandler} className='p-[5%] w-screen h-screen flex flex-col items-center'>
        <h1 className='text-3xl w-1/2 mb-5'>Add New Product</h1>
        <input 
        type="url" 
        placeholder="image" 
        className='text-xl bg-zinc-100 rounded p-3 w-1/2 mb-3'
        onChange={(e) => setimage(e.target.value)}
        value={image}
        />

        <input 
        type="text" 
        placeholder="title" 
        className='text-xl bg-zinc-100 rounded p-3 w-1/2 mb-3'
        onChange={(e) => settitle(e.target.value)}
        value={title}
        />

        <div className='flex justify-between w-1/2'>
        <input 
        type="text" 
        placeholder="category" 
        className='text-xl bg-zinc-100 rounded p-3 w-[48%] mb-3'
        onChange={(e) => setcategory(e.target.value)}
        value={category} />

        <input 
        type="text" 
        placeholder="price" 
        className='text-xl bg-zinc-100 rounded p-3 w-[48%] mb-3'
        onChange={(e) => setprice(e.target.value)}
        value={price} />

        </div>

        <textarea 
        placeholder="Add product description here..." 
        className='text-xl bg-zinc-100 rounded p-3 w-1/2 mb-3'
        rows="10"
        onChange={(e) => setdescription(e.target.value)}
        value={description}
        />

        <div className='w-1/2'><button className='py-3 px-5 border rounded border-blue-200 text-blue-300'>Add New Product</button></div>
      </form>

    </div>
  )
}

export default Create
