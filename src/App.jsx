import { Routes, Route } from "react-router-dom";

import Announcement from "./Components/Announcement/Announcement";
import Navbar from "./Components/Navbar/Navbar";
import Newsletter from "./Components/Newsletter/Newsletter";
import Footer from "./Components/Footer/Footer";
import Hero from "./Components/Hero/Hero";
import BrandStrip from "./Components/BrandStrip/BrandStrip";
import ProductSection from "./Components/ProductSection/ProductSection";
import TopSelling from "./Components/TopSelling/TopSelling";
import BrowseStyle from "./Components/BrowseStyle/BrowseStyle";
import HappyCustomers from "./Components/HappyCustomers/HappyCustomers";

import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Category from "./Pages/Category/Category";
import Cart from "./Pages/Cart/Cart";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";


function Home() {
  return (
    <>
      <Hero />
      <BrandStrip />
      <ProductSection />
      <TopSelling />
      <BrowseStyle />
      <HappyCustomers />
    </>
  );
}


function App() {
  return (
    <>
    <ScrollToTop/>
      <Announcement />

      <Navbar />

      <Routes>

        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Product Details Page */}
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* Category Page */}
        <Route path="/category" element={<Category />} />

        {/* Cart Page */}
        <Route path="/cart" element={<Cart />} />

      </Routes>

      <Newsletter />

      <Footer />
    </>
  );
}


export default App;