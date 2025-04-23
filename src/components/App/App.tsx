import React from "react";
import AppRoutes from "../Routes/Routes";
import './App.css'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Category from "../Category/Category";
import Products from "../Products/Products";

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