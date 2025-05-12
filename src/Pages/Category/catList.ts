import { ICategory } from '../../Interface/CatInterface';
import Milk from '../../assets/catIMG/Milk.jpg';
import Sweet from '../../assets/catIMG/Sweet.jpg';
import Fruits from '../../assets/catIMG/Fruits.jpg';
import Vegetables from '../../assets/catIMG/vegetables.jpg';
import Meat from '../../assets/catIMG/meat.jpeg';
import Fish from '../../assets/catIMG/Fish.jpeg';
import Cooked from '../../assets/catIMG/Cooked.jpg';
import CTC from '../../assets/catIMG/CTC.jpeg';

export const categories: ICategory[] = [
    {
        id: 1,
        name: 'Молочные продукты',
        img: Milk
    },
    {
        id: 2,
        name: 'Сладкое',
        img: Sweet
    },
    {
        id: 3, 
        name: 'Фрукты',
        img: Fruits
    }
    ,
    {
        id: 4, 
        name: 'Овощи',
        img: Vegetables
    }
    ,
    {
        id: 5, 
        name: 'Мясо',
        img: Meat
    }
    ,
    {
        id: 6, 
        name: 'Рыба и морепродукты',
        img: Fish
    }
    ,
    {
        id: 7, 
        name: 'Готовая еда',
        img: Cooked
    }
    ,
    {
        id: 8, 
        name: 'Кофе, чай, какао',
        img: CTC
    }
]