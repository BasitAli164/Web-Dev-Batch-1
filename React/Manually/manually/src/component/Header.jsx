import React, { useState } from 'react';
import './Header.css'; // Import the CSS file for styling

const Header = () => {
  const messages = [
    'Free Shipping On Orders Over $75. Free returns.',
    'Labor Day Sale Is Here: Get 30% Off Sitewide* Shop Men | Shop Women',
    'The New Tree Glider Has Landed: Lightweight. Airy. Made For Life In Motion. Shop Men | Shop Women',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
  };

  return (
    <>
      <div className="promo-banner">
        <div className="text-container">
          <p>{messages[currentIndex]}</p>
        </div>
        <button className="arrow-button" onClick={handleNext}>
          &gt;
        </button>
      </div>
      <header className="app-bar">
        <div className="toolbar">
          <div className="nav-left">
            <a href="#men">Men</a>
            <a href="#women">Women</a>
            <a href="#kids">Kids</a>
            <a href="#socks">Socks</a>
          </div>
          <div className="logo">
            <h1>allbirds</h1>
          </div>
          <div className="nav-right">
            <a href="#sustainability">Sustainability</a>
            <a href="#rerun">ReRun</a>
            <a href="#stores">Stores</a>
            <a href="#search" className="icon">🔍</a>
            <a href="#user" className="icon">👤</a>
            <a href="#help" className="icon">❓</a>
            <a href="#shipping" className="icon">🚚</a>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
