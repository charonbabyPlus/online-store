import React from "react";
import { useState } from "react";
import './Category.css'

const Category = ({ name, items } : {name: string, items:string[]}) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="category">
        <div 
          className="category-header" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <h3>{name}</h3>
          <span className="category-icon">
            {isOpen ? '−' : '+'}
          </span>
        </div>
        
        {isOpen && (
          <ul className="category-items">
            {items.map((item, index) => (
              <li key={index} className="category-item">
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

export default Category