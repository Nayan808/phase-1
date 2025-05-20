import React, { useState } from 'react';
import { useClerk, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/images/portfolio-logo.png';

const Navbar = () => {
  const [isNavActive, setIsNavActive] = useState(false);
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleNav = () => {
    setIsNavActive(!isNavActive);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const scrollToServices = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
          servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const servicesSection = document.getElementById('services');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsNavActive(false);
  };

  return (
    <nav id="home">
      <div className="container main-nav flex">
        <Link to="/" className="company-logo">
          <img src={logo} alt="Review Faster Logo" className="nav-logo" />
          <span>Review Faster</span>
        </Link>
        <div className={`nav-links ${isNavActive ? 'active' : ''}`} id="nav-links">
          <ul className="flex">
            <li>
              <Link to="/" className="hover-link">Home</Link>
            </li>
            <li>
              <a href="#services" className="hover-link" onClick={scrollToServices}>Services</a>
            </li>
            <SignedIn>
              <li>
                <Link to="/generate-reviews" className="hover-link">Generate Reviews</Link>
              </li>
            </SignedIn>
            <li>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="google-btn hover-link primary-button">
                    Log In
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <div className="flex items-center gap-4">
                  <UserButton afterSignOutUrl="/" />
                  <button 
                    onClick={handleSignOut} 
                    className="google-btn hover-link primary-button"
                  >
                    Sign Out
                  </button>
                </div>
              </SignedIn>
            </li>
          </ul>
        </div>
        <button className="nav-toggle hover-link" id="nav-toggle" onClick={toggleNav}>
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar; 