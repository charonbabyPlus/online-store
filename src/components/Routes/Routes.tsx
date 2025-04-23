import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import Category from "../Category/Category";
import Products from "../Products/Products";
import SearchPage from "../SearchPage/SearchPage"; 
import Basket from "../Basket/Basket";
import { ROUTES } from "../../utils/routes"; 

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.CATEGORIES} element={<Category />} />
            <Route path={ROUTES.CATEGORY} element={<Products />} />
            <Route path={ROUTES.SEARCH} element={<SearchPage />} />
         
            {/* <Route path={ROUTES.PRODUCT} element={<ProductDetails />} /> */}
        </Routes>
    )
}

export default AppRoutes