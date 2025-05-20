import React from 'react';
import './Header.css';
import rocket from '../assets/images/companylogo.png';

const Header = () => {
  return (
    <section className="header-section">
      <div className="header-container">
        <div className="header-left">
          <h1>Developing Within You</h1>
          <p>
            Respond to customer reviews faster, manage client relationships, and get ready for seamless Google Business integration.
          </p>
          <button className="header-cta">Get started</button>
        </div>
        <div className="header-right">
          <img src={rocket} alt="Rocket Illustration" />
        </div>
      </div>
    </section>
  );
};

export default Header; 