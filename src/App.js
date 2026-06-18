import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GamingHero from './components/gamingHero';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import useTheme from './hooks/useTheme';

function App() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<GamingHero isDark={isDark} toggleTheme={toggleTheme} />} />
          <Route path="/about" element={<About isDark={isDark} toggleTheme={toggleTheme} />} />
          <Route path="/contact" element={<Contact isDark={isDark} toggleTheme={toggleTheme} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
