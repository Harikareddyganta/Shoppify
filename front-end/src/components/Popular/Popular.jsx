import React, { useEffect, useState } from "react";
import "./Popular.css";
import Item from "../Item/Item.jsx";
const Popular = () => {
  const [popularproducts, setpopularproducts] = useState([]);

  useEffect(() => {
    fetch("https://shoppify-backend-x2xq.onrender.com/popularinwomen")
      .then((response) => response.json())
      .then((data) => setpopularproducts(data));
  }, []);

  return (
    <div className="popular">
      <div className="popular-h1">
        {" "}
        <h1>Popular in women</h1> <hr />
      </div>
      <div className="popular-item">
        {popularproducts.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              old_price={item.old_price}
              new_price={item.new_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
