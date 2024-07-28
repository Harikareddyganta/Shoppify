import React, { useContext } from 'react'
import './CartItems.css'
import removeicon from '../Assets/cart_cross_icon.png'
import { ShopContext } from "../../context/ShopContext";

const CartItems = () => {
        const {all_products, cartItem, removeFromCart,getTotalCartAmount}=useContext(ShopContext)
    return (
        <div className="cartitems">
            <div className="cartitem-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {
            all_products.map((e)=>{
                if(cartItem[e.id]>0){
                        return (<div>
                                <div className="cartitem-format cartitem-format-main">
                                        <img src={e.image} alt="" className='carticon-producticon' />
                                        <p>{e.name}</p>
                                        <p>${e.new_price}</p>
                                        <button className='cartitem-quantity'>{cartItem[e.id]}</button>
                                        <p> ${e.new_price * cartItem[e.id]}</p>
                                        <img src={removeicon} onClick={()=>{removeFromCart(e.id)}} alt="" className='cartitem-removeicon' />
                                </div>
                                <hr />
                </div>)
                }
                return null; // Add this line
            })
            }
            <div className="cartitem-down">
                <div className="cartitem-total">
                    <h1>cart Totals</h1>
                    <div>
                        <div className="cartitem-total-item">
                            <p>Sub-Total</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className='cartitem-total-item'>
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className='cartitem-total-item'>
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button>Proceed To Checkout</button>
                </div>
                <div className="cartitem-promocode">
                    <p>If you have a promo code enter it here</p>
                    <div className="cartitem-promobox">
                        <input type="text" placeholder='Promo Code' />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItems
