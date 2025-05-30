import React from "react";
import { Routes, Route, useLocation } from "react-router-dom"; // ✅ Добавляем useLocation
import Home from "../Pages/Home/Home";
import Category from "../Pages/Category/Category";
import Products from "../Pages/Products/Products";
import SearchPage from "../Pages/SearchPage/SearchPage"; 
import Basket from "../Pages/Basket/Basket";
import { ROUTES } from "../utils/routes"; 
import { CartProvider } from "../Pages/Basket/CartContext";
import Profile from "../Pages/Profile/Profile";


const AppRoutes = () => {
  const location = useLocation(); 
  const searchTerm = new URLSearchParams(location.search).get('q') || '';

  return (
    <CartProvider searchTerm={searchTerm}>
      <Routes>
        {/* pages */}
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.CATEGORIES} element={<Category />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
        <Route path={ROUTES.CATEGORY} element={<Products />} />
        <Route path={ROUTES.SEARCH} element={<SearchPage />} />
        <Route path={ROUTES.BASKET} element={<Basket />} />
      </Routes>
    </CartProvider>
  );
};

export default AppRoutes;