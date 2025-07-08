// 📁 src/pages/HomePage.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import Footer from '../components/Footer';
import LoginModal from '../components/LoginModal';
import RequestModal from '../components/RequestModal';

const HomePage = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div style={{ background: 'linear-gradient(to bottom right,rgb(143, 181, 230), #ffffff)' }}>
      <Navbar
        onLoginClick={() => setLoginOpen(true)}
        onRequestClick={() => setRequestOpen(true)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <HeroSection />
      <ServicesSection />
      <Footer />

      <LoginModal open={loginOpen} handleClose={() => setLoginOpen(false)} />
      <RequestModal open={requestOpen} handleClose={() => setRequestOpen(false)} />
    </div>
  );
};

export default HomePage;
