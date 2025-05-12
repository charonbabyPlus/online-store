import React from "react";
import AppRoutes from "../Routes/Routes";
import './App.css'
import Header from "../Layouts/Header/Header";
import Footer from "../Layouts/Footer/Footer";
import Category from "../Pages/Category/Category";
import Products from "../Pages/Products/Products";
import { CartProvider } from "../Pages/Basket/CartContext";

const App = () => {

      
    return( 
    <div className="app">
        
            <Header />
                <AppRoutes />
            <Footer />
       
    </div>
    )
}

export default App