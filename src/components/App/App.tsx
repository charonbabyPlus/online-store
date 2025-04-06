import React from "react";
import AppRoutes from "../Routes/Routes";
import './App.css'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Category from "../Category/Category";

const App = () => {

    const categories = [
        {
          name: 'Молочные продукты',
          items: ['Молоко', 'Сыр', 'Йогурт', 'Творог']
        },
        {
          name: 'Сладкое',
          items: ['Шоколад', 'Печенье', 'Конфеты', 'Торт']
        },
        {
          name: 'Фрукты',
          items: ['Яблоки', 'Бананы', 'Апельсины']
        }
      ];
    return( 
    <div className="app">
        <Header />
        <div>
        {categories.map((category, index) => (
        <Category 
          key={index}
          name={category.name} 
          items={category.items} 
        />
      ))}
            <AppRoutes />
        </div>
        <Footer />
    </div>
    )
}

export default App