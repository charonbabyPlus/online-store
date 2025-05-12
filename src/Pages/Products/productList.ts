import { IProducts } from "../../Interface/ProdInterface";

export const productList: IProducts[] = [
    {
        categoryId: 1,
        id: 1,
        title: "Молоко Простоквашино 4.5% 930 мл",
        image: "../../assets/productIMG/MilkProst45.webp",
        price: 170,
        calories: 160,
        description: "Свежее пастеризованное молоко высшего качества. Жирность 4.5%. Объем 930 мл. Хранить при температуре +2...+6°C."
    },
    {
        categoryId: 1,
        id: 2,
        title: "Молоко Простоквашино 2.5% 930 мл",
        image: "../../assets/productIMG/MilkProst25.webp",
        price: 130,
        calories: 120,
        description: "Молоко с пониженной жирностью 2.5%. Объем 930 мл. Богато кальцием и витаминами. Хранить при температуре +2...+6°C."
    },
    {
        categoryId: 1,
        id: 3,
        title: "Сыр ЛАМБЕР 1 кг",
        image: "../../assets/productIMG/CheesLamb1.webp",
        price: 599,
        calories: 450,
        description: "Сыр Ламбер - полутвердый сыр с нежным вкусом. Вес 1 кг. Отлично подходит для бутербродов и приготовления блюд."
    },
    {
        categoryId: 2,
        id: 4,
        title: "Шоколад",
        image: "../../assets/productIMG/chocolate.jpg",
        price: 3.49,
        calories: 220,
        description: "Молочный шоколад с орехами. Вес 100 г. Содержит какао-продукты, сахар, сухое молоко и фундук."
    },
    {
        categoryId: 3,
        id: 5,
        title: "Яблоко",
        image: "../../assets/productIMG/apple.jpg",
        price: 0.99,
        calories: 95,
        description: "Свежие яблоки сорта Гала. Вес около 150 г каждое. Богаты витаминами и клетчаткой."
    }
];