import React, { useContext } from 'react'
import { ProductContext } from '../utils/Context'
import { Link } from 'react-router-dom';

function Nav() {
  const [products] = useContext(ProductContext);

  let distinct_category = 
    products && products.reduce((acc,cv) => [...acc, cv.category], []);
    distinct_category = [...new Set(distinct_category)];

   const color = () => {
     return `rgba(${(Math.random()*255).toFixed()}, ${(Math.random()*255).toFixed()}, ${(Math.random()*255).toFixed()}, 0.4)`
   } 

  return (
    <div className="flex w-[15%] h-screen">

      <nav className='w-full bg-zinc-100 h-screen flex flex-col items-center pt-5'>
        <a className='hover:bg-blue-100 py-3 px-5 border rounded border-blue-400 text-blue-400' href="/create">Add New Product</a>
        <hr className='w-[80%] my-4' />
        <h1 className='text-2xl mb-3 w-[80%]'>Category</h1>

        {distinct_category.map((cat,index) => (
          <div key={index} className='w-[80%] hover:bg-zinc-200 rounded-md px-2 py-2 mb-2'>
            <Link to={`/?category/=${cat}`} className='flex items-center'> 
            <span style={{background: color()}} className='rounded-full mr-2 w-[15px] h-[15px] '></span>{" "} 
            {cat}</Link>
          </div>
        ))}
        
      </nav>

    </div>

  )
}

export default Nav
