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
import Wishlist from "./Pages/Wishlist/Wishlist";
import Orders from "./Pages/Orders/Orders";
import Login from "./Pages/Auth/Login";
import Profile from "./Pages/Profile/Profile";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import NotFound from "./Pages/NotFound/NotFound";
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
      <ScrollToTop />
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

        {/* Wishlist Page */}
        <Route path="/wishlist" element={<Wishlist />} />

        {/* Orders Tracking Page */}
        <Route path="/orders" element={<Orders />} />

        {/* Authentication Page */}
        <Route path="/login" element={<Login />} />

        {/* User Profile */}
        <Route path="/profile" element={<Profile />} />

        {/* Admin Dashboard & External Connector */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* 404 Not Found Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Newsletter />
      <Footer />
    </>
  );
}

export default App;