import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import Breadcrumps from "../components/Breadcrumps/Breadcrumps";
import Productdisplay from "../components/Productdisplay/Productdisplay";
import Descriptionbox from "../components/Descriptionbox/Descriptionbox";
import RelatedProducts from "../components/RelatedProducts/RelatedProducts";

const Product = () => {
  const { all_products } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_products.find((item) => item.id === Number(productId));
  return (
    <div>
      <Breadcrumps product={product} />
      <Productdisplay product={product}/>
      <Descriptionbox/>
      <RelatedProducts/>
    </div>
  );
};

export default Product;
