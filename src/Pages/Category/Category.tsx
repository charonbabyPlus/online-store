import './Category.css'
import { useNavigate } from "react-router-dom";
import { categories } from "./catList";


const Category = () => {
   
    const navigate = useNavigate()
    return (
      <div className="category">
        
         {categories.map((item) => (
          <div className="category-item" onClick={() => navigate(`/categories/${item.id}`)}>
            <img src={item.img} alt={item.name} />
            <p>{item.name}</p>
          </div>
         ))}
        </div>
        
        
    );
  }

export default Category