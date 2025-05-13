import React, { useState } from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`${ROUTES.SEARCH}?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="header">
        <div className="header-left">
            <Link to={ROUTES.HOME} className="logo-link">
                <div className="logo-container">
                    <img
                    src="/header/logo.png"
                    alt="логотип"
                    className="logo"
                    />
                    <h1 className="shop-title">BlinkBasket</h1>
                </div>
            </Link>
        </div>

        <div className='search-container'>
            <form onSubmit={handleSearch}>
                <input 
                    type="search" 
                    name="search"
                    placeholder='Поиск'
                    autoComplete='off'
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery}
                    className='search-input'
                />
                <button type="submit" className="search-button">Поиск</button>
            </form>
        </div>
        
        <nav className="nav">
            <ul>
                <li><Link to={ROUTES.HOME}>Главная</Link></li>
                <li><Link to={ROUTES.PROFILE}>Профиль</Link></li>
                <li><Link to={ROUTES.BASKET}>Корзина</Link></li>
            </ul>
        </nav>
    </header>
  );
}