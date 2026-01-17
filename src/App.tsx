import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Helmet } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import StarField from './components/StarField';
import CursorFollower from './components/CursorFollower';
import ScrollProgress from './components/ScrollProgress';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
    });

    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <Helmet>
        <title>Smith | Aerospace Engineer - Pioneering Space Exploration</title>
        <meta name="description" content="Smith - Senior Aerospace Engineer specializing in propulsion systems, spacecraft design, and mission planning. Pioneering the future of space exploration." />
      </Helmet>

      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Background Effects */}
            <StarField />
            <div className="nebula-bg" />
            
            {/* Custom Cursor */}
            <CursorFollower />
            
            {/* Scroll Progress */}
            <ScrollProgress />
            
            {/* Navigation */}
            <Navbar />
            
            {/* Main Content */}
            <main className="relative z-10">
              <Hero />
              <About />
              <Skills />
              <Experience />
              <Projects />
              <Achievements />
              <Testimonials />
              <Gallery />
              <Contact />
            </main>
            
            {/* Footer */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App;
