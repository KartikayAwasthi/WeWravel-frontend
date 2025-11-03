import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Existing Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import About from "./components/About";
import Contact from "./components/Contact";
import Testimonials from "./components/Testimonials";
import SignupPage from "./SignupPage";
import Login from "./Login";
import ChatbotButton from "./components/ChatBotButton";
import WhatsAppButton from "./components/WhatsappButton";
import BookingPage from "./BookingPage";
import UserDashboard from "./UserDashboard";
import PageTransition from "./components/PageTransition";
import BookingStatusPage from "./BookingStatusPage";

// ✅ New Trip Components
import TripList from "./components/TripList";
import TripDetail from "./components/TripDetail";
import CallExpertButton from "./components/CallExpertButton";

// Scroll to Top Component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <Router>
      <div className="bg-gradient-to-b from-[#0a0f1e] via-[#111827] to-[#1f2937] min-h-screen text-white font-sans">
           <PageTransition />
        {/* ✅ Navbar always on top */}
        <Navbar />

        {/* Auto-scroll on route change */}
        <ScrollToTop />

        {/* ✅ All Routes */}
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <TripList /> 
                <About />
                <Testimonials />
                <Contact />
              </>
            }
          />

          {/* Static Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<Login />} />

          {/* ✅ New Dynamic Trip Pages */}
          <Route path="/trips" element={<TripList />} />
          <Route path="/trip/:id" element={<TripDetail />} />
           <Route path="/booking/:id" element={<BookingPage />} />
           <Route path="/dashboard" element={<UserDashboard />} />
           <Route path="/booking-status" element={<BookingStatusPage />} />
           
        </Routes>

        {/* ✅ Global Components */}
        <CallExpertButton/>
        <WhatsAppButton />
        <ChatbotButton />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
