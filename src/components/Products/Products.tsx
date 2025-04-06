import React from "react";
import { Link } from "react-router-dom";

const Products = ({ title, products } : {
    title: string
    products: string[]
}) => {
    return (
        <section>
            {title && <h2>{title}</h2>}
            
           {/* <div>
                {products.map((id, images, title, price) => (
                    <Link to={`/products/${id}`} key={id}>
                        
                    </Link>
                ))}    
            </div>   */} 
        </section>
        
    )
}

export default Products