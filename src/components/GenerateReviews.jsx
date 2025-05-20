import React, { useState } from 'react';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import './GenerateReviews.css';

const GenerateReviews = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    customerExperience: '',
    rating: 5,
    tone: 'positive'
  });
  const [generatedReview, setGeneratedReview] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    
    try {
      // TODO: Replace with actual API call to your backend
      // This is a mock response for now
      const mockGeneratedReview = `I recently visited ${formData.businessName} and was absolutely impressed with their service. As a ${formData.businessType} establishment, they truly excel in providing ${formData.customerExperience}. The attention to detail and professional approach made my experience exceptional. I would highly recommend them to anyone looking for quality service in this industry.`;
      
      setTimeout(() => {
        setGeneratedReview(mockGeneratedReview);
        setIsGenerating(false);
      }, 1500);
    } catch (error) {
      console.error('Error generating review:', error);
      setIsGenerating(false);
    }
  };

  return (
    <>
      <SignedIn>
        <section className="generate-reviews-section">
          <div className="container">
            <div className="generate-reviews-header">
              <h2>Generate AI-Powered Reviews</h2>
              <p>Create authentic, engaging reviews for your business</p>
            </div>
            
            <div className="generate-reviews-container">
              <form onSubmit={handleSubmit} className="review-form">
                <div className="form-group">
                  <label htmlFor="businessName">Business Name</label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    required
                    placeholder="Enter your business name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="businessType">Business Type</label>
                  <input
                    type="text"
                    id="businessType"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Restaurant, Hotel, Retail Store"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="customerExperience">Customer Experience</label>
                  <textarea
                    id="customerExperience"
                    name="customerExperience"
                    value={formData.customerExperience}
                    onChange={handleChange}
                    required
                    placeholder="Describe the customer experience (e.g., friendly service, quick delivery, quality products)"
                    rows="4"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="rating">Rating</label>
                  <select
                    id="rating"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    required
                  >
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="tone">Review Tone</label>
                  <select
                    id="tone"
                    name="tone"
                    value={formData.tone}
                    onChange={handleChange}
                    required
                  >
                    <option value="positive">Positive</option>
                    <option value="neutral">Neutral</option>
                    <option value="constructive">Constructive</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  className="generate-button"
                  disabled={isGenerating}
                >
                  {isGenerating ? 'Generating...' : 'Generate Review'}
                </button>
              </form>

              {generatedReview && (
                <div className="generated-review">
                  <h3>Generated Review</h3>
                  <div className="review-content">
                    <p>{generatedReview}</p>
                  </div>
                  <div className="review-actions">
                    <button className="copy-button">
                      <i className="fa-regular fa-copy"></i> Copy
                    </button>
                    <button className="regenerate-button">
                      <i className="fa-solid fa-rotate"></i> Regenerate
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default GenerateReviews; 