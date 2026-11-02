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
import Orders from "./Pages/Orders/Orders";
import Login from "./Pages/Auth/Login";
import Profile from "./Pages/Profile/Profile";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import NotFound from "./Pages/NotFound/NotFound";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import { FooterInfoPage } from "./Pages/FooterPages/FooterInfoPage";

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
        {/* Core Store Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/category" element={<Category />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Profile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Dedicated Pages for Every Footer Link */}
        <Route path="/about" element={<FooterInfoPage pageKey="about" />} />
        <Route path="/features" element={<FooterInfoPage pageKey="features" />} />
        <Route path="/works" element={<FooterInfoPage pageKey="works" />} />
        <Route path="/career" element={<FooterInfoPage pageKey="career" />} />

        <Route path="/customer-support" element={<FooterInfoPage pageKey="customer-support" />} />
        <Route path="/delivery-details" element={<FooterInfoPage pageKey="delivery-details" />} />
        <Route path="/terms" element={<FooterInfoPage pageKey="terms" />} />
        <Route path="/privacy" element={<FooterInfoPage pageKey="privacy" />} />

        <Route path="/manage-deliveries" element={<FooterInfoPage pageKey="manage-deliveries" />} />
        <Route path="/payments" element={<FooterInfoPage pageKey="payments" />} />

        <Route path="/free-ebooks" element={<FooterInfoPage pageKey="free-ebooks" />} />
        <Route path="/development-tutorial" element={<FooterInfoPage pageKey="development-tutorial" />} />
        <Route path="/how-to-blog" element={<FooterInfoPage pageKey="how-to-blog" />} />
        <Route path="/youtube-playlist" element={<FooterInfoPage pageKey="youtube-playlist" />} />
        <Route path="/brands" element={<FooterInfoPage pageKey="brands" />} />

        {/* 404 Not Found Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Newsletter />
      <Footer />
    </>
  );
}

export default App;