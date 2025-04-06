import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';

export default function Header() {
  return (
    <header className="header">
        <div className="header-left">
            <h1>BlinkBasket</h1>
            <Link to={ROUTES.HOME}>
                <img
                    src="/header/logo.png"
                    alt="логотип"
                    className="logo"
                />
            </Link>
        </div>

        <div className='search-container'>
            <form>
                <input type="search" name="search"
                placeholder='Поиск'
                autoComplete='off'
                onChange={() => {}}
                value=''
                className='search-input'
                />
                <button className="search-button">Поиск</button>
            </form>
        </div>
        

        <nav className="nav">
            <ul>
                <li><Link to={ROUTES.HOME}>Главная</Link></li>
                <li><Link to={ROUTES.CART}>Профиль</Link></li>
                <li><Link to={ROUTES.BASKET}>Корзина</Link></li>
            </ul>
        </nav>
    </header>
  );
}