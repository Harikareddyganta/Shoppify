import React, { useEffect, useState } from "react";
import "../Newcollections/Newcollections.css";
import Item from "../Item/Item";

const Newcollections = () => {
  const [new_collections, setnew_collections] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/newcollections")
      .then((response) => response.json())
      .then((data) => setnew_collections(data));
  }, []);
  return (
    <div className="newcollections">
      <h1>New Collections</h1>
      <hr />
      <div className="collections">
        {new_collections.map((item, i) => {
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

export default Newcollections;
