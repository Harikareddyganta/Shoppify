import React, { createContext, useState, useEffect } from "react";
export const ShopContext = createContext(null);

const getDefaulCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_products, setall_products] = useState([]);
  const [cartItem, setcartItem] = useState(getDefaulCart());
  const url="https://shoppify-backend-x2xq.onrender.com";
  useEffect(() => {
    fetch(`${url}/allProduct`)
      .then((response) => response.json())
      .then((data) => setall_products(data));

    if (localStorage.getItem("auth-token")) {
      fetch(`${url}/getcart`, {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: "",
      })
        .then((res) => res.json())
        .then((data) => setcartItem(data));
    }
  }, []);

  const addToCart = (itemId) => {
    setcartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch(`${url}/addtocart`, {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  const removeFromCart = (itemId) => {
    setcartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch(`${url}/removefromcart`, {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  const getTotalCartAmount = () => {
    let Totalamt = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = all_products.find(
          (product) => product.id === Number(item)
        );
        Totalamt += cartItem[item] * itemInfo.new_price;
      }
    }
    return Totalamt;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = all_products.find(
          (product) => product.id === Number(item)
        );
        totalItem += cartItem[item];
      }
    }
    return totalItem;
  };

  const contextvalue = {
    all_products,
    cartItem,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
  };

  return (
    <ShopContext.Provider value={contextvalue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
