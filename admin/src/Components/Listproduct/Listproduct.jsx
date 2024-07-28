import React, { useEffect, useState } from 'react'
import './Listproduct.css'
import crossicon from '../../Assets/cross_icon.png'
const Listproduct = () => {
  const [allproducts,setallproducts]=useState([]);

  const fetchinfo=async()=>{
    await fetch('http://localhost:4000/allProduct').then((res)=>res.json())
    .then((data)=>(setallproducts(data)));
  }

  //everytime fetchinfo changes
  useEffect(()=>{
    fetchinfo();
  },[])

  const removeproduct=async(id)=>{
    await fetch('http://localhost:4000/removeProduct',{
      method:"POST",
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({id:id})
    })
   await fetchinfo();
  }

  return (
    <div className='listproduct'>
      <h1>All Products List</h1>
      <div className="listproduct-formatmain">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {
          allproducts.map((product,ind)=>{
            return<> <div key={ind} className="listproduct-formatmain listproduct-format">
              <img className='listproduct-product-icon' src={product.image} alt="" />
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <img className='listproduct_removeicon' src={crossicon} alt=""  onClick={()=>{removeproduct(product.id)}} />
            </div>
            <hr />
            </>
          })
        }
      </div>
    </div>
  )
}

export default Listproduct
