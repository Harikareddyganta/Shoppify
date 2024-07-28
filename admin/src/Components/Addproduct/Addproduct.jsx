import React from "react";
import "./Addproduct.css";
import upload_area from "../../Assets/upload_area.svg";
import { useState } from "react";
const Addproduct = () => {
  const [image, setimage] = useState(false);
  const [productdetails, setproductdetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: "",
  });

  //handling changes
  const changeHandler = (e) => {
    setproductdetails({ ...productdetails, [e.target.name]: e.target.value });
  };
  const imageHandler = (e) => {
    setimage(e.target.files[0]);
  };

  const addProduct = async () => {
    console.log(productdetails);
    let responseData;
    let product = productdetails;
    let formdata = new FormData();
    formdata.append("product", image);
    await fetch("http://localhost:4000/upload", {
      method: "POST",
      headers: { Accept: "application/json" }, //it says the client prefers json responce
      body: formdata,
    })
      .then((res) => res.json())
      .then((data) => {
        responseData = data;
      });
    //image added to db now product adding
    if (responseData.success) {
      product.image = responseData.image_url;
      console.log(product);
      await fetch("http://localhost:4000/addProduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then((data) => {
          data.success ? alert("Data added") : alert("Failed");
        });
    }
  };
  return (
    <div className="addproduct">
      <div className="addproduct-item-field">
        <p>Product Title</p>
        <input
          value={productdetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type Here"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-item-field">
          <p>Price</p>
          <input
            value={productdetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Type Here"
          />
        </div>
        <div className="addproduct-item-field">
          <p>Offer Price</p>
          <input
            value={productdetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="Type Here"
          />
        </div>
      </div>
      <div className="addproduct-item-field">
        <p>Product Category</p>
        <select
          value={productdetails.category}
          onChange={changeHandler}
          name="category"
          className="addproduct-selector"
        >
          <option value="women">women</option>
          <option value="men">men</option>
          <option value="kid">kid</option>
        </select>
      </div>
      <div className="addproduct-item-field">
        {/* when label htmlFor is mtached with input field id then 
        when label is clicked input is highlighted */}
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            alt=""
            className="addproduct-thumbnail-img"
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button onClick={addProduct} className="add-product-btn">
        ADD
      </button>
    </div>
  );
};

export default Addproduct;
