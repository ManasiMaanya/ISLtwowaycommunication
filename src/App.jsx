import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastProvider } from './components/common/Toast';
import { Navbar } from './components/navigation/Navbar';
import { Footer } from './components/navigation/Footer';

// Pages
import { LandingPage } from './pages/LandingPage';
import { AboutPage } from './pages/AboutPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { DashboardPage } from './pages/DashboardPage';
import { LiveSessionPage } from './pages/LiveSessionPage';
import { LearnPage } from './pages/LearnPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppLayout() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="app-main min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/session/:id" element={<LiveSessionPage />} />
          <Route path="/learn" element={<LearnPage />} />
          {/* Fallback */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
}

export function App() {
  return (
    <ToastProvider>
      <Router>
        <ScrollToTop />
        <AppLayout />
      </Router>
    </ToastProvider>
  );
}

export default App;
