import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="login-box">
        <img src="/mainlogo.png" alt="Review Faster Logo" className="login-logo" />
        <h1>Welcome to Review Faster</h1>
        <SignIn 
          routing="path" 
          path="/login"
          signUpUrl="/signup"
          redirectUrl="/hom"
          appearance={{
            elements: {
              formButtonPrimary: {
                backgroundColor: '#4CAF50',
                '&:hover': {
                  backgroundColor: '#45a049'
                }
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default Login; 