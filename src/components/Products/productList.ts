import { IProducts } from "../../Interface/ProdInterface";


export const productList: IProducts[] = [
    {
        categoryId: 1,
        id: 1,
        title: "Молоко Простоквашино 4.5% 930 мл",
        image: "../../assets/productIMG/MilkProst45.webp",
        price: 170,
        calories: 160
    },
    {
        categoryId: 1,
        id: 2,
        title: "Молоко Простоквашино 2.5% 930 мл",
        image: "../../assets/productIMG/MilkProst25.webp",
        price: 130,
        calories: 120
    },
    {
        categoryId: 1,
        id: 3,
        title: "Сыр ЛАМБЕР 1 кг",
        image: "../../assets/productIMG/CheesLamb1.webp",
        price: 599,
        calories: 450
    },
    {
        categoryId: 2,
        id: 3,
        title: "Шоколад",
        image: "../../assets/productIMG/chocolate.jpg",
        price: 3.49,
        calories: 220
    },
    {
        categoryId: 3,
        id: 4,
        title: "Яблоко",
        image: "../../assets/productIMG/apple.jpg",
        price: 0.99,
        calories: 95
    },
    // Добавьте другие товары по необходимости
];