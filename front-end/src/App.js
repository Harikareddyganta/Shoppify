import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Shop from "./pages/Shop";
import ShopCategory from "./pages/ShopCategory";
import Product from "./pages/Product";
import LoginSignup from "./pages/LoginSignup";
import Cart from "./pages/Cart";
import Footer from "./components/Footer/Footer";
import mens_banner from "./components/Assets/banner_mens.png";
import womens_banner from "./components/Assets/banner_women.png";
import kids_banner from "./components/Assets/banner_kids.png";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Shop />} />
          <Route
            exact
            path="/mens"
            element={<ShopCategory banner={mens_banner} category="men" />}
          />
          <Route
            exact
            path="/womens"
            element={<ShopCategory banner={womens_banner} category="women" />}
          />
          <Route
            exact
            path="/kids"
            element={<ShopCategory banner={kids_banner} category="kid" />}
          />
          <Route path="/product/:productId" element={<Product />} />

          <Route path="/login" element={<LoginSignup />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
