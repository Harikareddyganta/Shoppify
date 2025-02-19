import React from 'react'
import './RelatedProducts.css'
import data from '../Assets/data'
import Item from '../Item/Item'
const RelatedProducts = () => {
  return (
    <div className='relatedproducts'>
        <h1>Related Products</h1><hr />
        <div className="relatedproducts-item">
            {data.map((item,i)=>{
               return <Item key={i}
               id={item.id}
               name={item.name}
               image={item.image}
               old_price={item.old_price}
               new_price={item.new_price}/>
            })}
        </div>
      
    </div>
  )
}

export default RelatedProducts
