import React, { useState } from 'react';
import './Services.css';
import service1 from '../assets/images/service (1).png';
import service2 from '../assets/images/service (2).png';
import service6 from '../assets/images/service (6).png';

const ServiceBox = ({ title, subtitle, description, image, features, isOdd }) => {
  const [isBoxActive, setIsBoxActive] = useState(false);

  return (
    <section className="big-feature-section">
      <div className={`container flex big-feature-container ${isOdd ? "reverse" : ""}`}>
        <div className="feature-img">
          <img src={image} alt={title} className="feature-image" />
        </div>
        <div className="feature-text">
          <h3 className="feature-title">{title}</h3>
          <h4 className="feature-subtitle">{subtitle}</h4>
          <p className="feature-description">{description}</p>

          <button 
            className="feature-button"
            onClick={() => setIsBoxActive(true)}
          >
            View more
            <i className="fa-solid fa-arrow-right button-icon"></i>
          </button>

          <div className={`services-box ${isBoxActive ? 'active-box' : ''}`}>
            <div className="services-box-content">
              <h2 className="services-box-title">{title}</h2>
              <button 
                className="services-box-close"
                onClick={() => setIsBoxActive(false)}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>

              <ul className="services-box-features">
                {features.map((feature, index) => (
                  <li key={index} className="services-box-feature">
                    <i className="fa-regular fa-circle-check"></i>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "Review Upraisals",
      subtitle: "Dynamic and AI-Generated Reviews",
      description: "Track, analyze, and respond to reviews from one dashboard. Save time with smart AI-based suggestions.",
      image: service6,
      features: [
        "Unique And Human Opinioned",
        "AI-Generated And Sharable",
        "SEO-Friendly Reviews",
        "Ongoing support and maintenance"
      ]
    },
    {
      title: "CRM Relationships",
      subtitle: "Improves Customer Engagement",
      description: "Manage client information, follow-ups, and communication in a simple and effective workspace.",
      image: service1,
      features: [
        "Re-Engaging Your Customer",
        "Customer Acquisition",
        "Customer Retention Rate"
      ]
    },
    {
      title: "GMB Support",
      subtitle: "Increases Customer Acquisition",
      description: "Enhance your brand with versatile and customized graphic design. We're adding full integration with Google Business Manager to streamline listings, insights, and responses.",
      image: service2,
      features: ["Coming Soon..."]
    }
  ];

  return (
    <section id="services" className="services-section">
      <div className="services-header">
        <h2>Your Brand, Our Extension</h2>
        <p>Comprehensive solutions to elevate your business presence</p>
      </div>
      <div className="services-container">
        {services.map((service, index) => (
          <ServiceBox key={index} {...service} isOdd={index % 2 === 1} />
        ))}
      </div>
    </section>
  );
};

export default Services; 