import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import { ToastProvider } from "./Context/ToastContext.jsx";
import { OrdersProvider } from "./Context/OrdersContext.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { CartProvider } from "./Context/Cart.jsx";

import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <OrdersProvider>
          <AuthProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </AuthProvider>
        </OrdersProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>
);