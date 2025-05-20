import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Services from './components/Services';
import Footer from './components/Footer';
import Login from './components/Login';
import GenerateReviews from './components/GenerateReviews';
import './App.css';

const clerkPubKey = 'pk_test_bmVhdC1idXJyby00OS5jbGVyay5hY2NvdW50cy5kZXYk';

const Home = () => (
  <div className="page-transition">
    <Header />
    <Services />
  </div>
);

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Router>
        <div className="App">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/generate-reviews" element={<GenerateReviews />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ClerkProvider>
  );
}

export default App; 