import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FaRocket, FaLinkedin, FaGithub, FaTwitter, FaYoutube, FaHeart } from 'react-icons/fa';
import { HiChevronUp } from 'react-icons/hi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', to: 'hero' },
    { name: 'About', to: 'about' },
    { name: 'Skills', to: 'skills' },
    { name: 'Experience', to: 'experience' },
    { name: 'Projects', to: 'projects' },
    { name: 'Contact', to: 'contact' },
  ];

  const socialLinks = [
    { icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FaGithub, href: 'https://github.com', label: 'GitHub' },
    { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: FaYoutube, href: 'https://youtube.com', label: 'YouTube' },
  ];

  return (
    <footer className="relative py-16 border-t border-space-accent/10">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-space-darker to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-space-accent text-3xl"
              >
                <FaRocket className="transform -rotate-45" />
              </motion.div>
              <span className="font-space text-2xl font-bold gradient-text">SMITH</span>
            </div>
            <p className="text-space-light/60 mb-6">
              Pioneering the future of space exploration through innovative aerospace engineering 
              and cutting-edge propulsion systems.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -3 }}
                  className="w-10 h-10 rounded-lg glass flex items-center justify-center text-space-steel hover:text-space-accent transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-space text-lg font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    smooth={true}
                    duration={500}
                    offset={-80}
                    className="text-space-light/60 hover:text-space-accent transition-colors cursor-pointer font-tech"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-space text-lg font-bold text-white mb-4">Mission Control</h4>
            <div className="space-y-3 text-space-light/60 font-tech">
              <p>📍 Houston, Texas, USA</p>
              <p>📧 smith@aerospace.com</p>
              <p>📱 +1 (555) 123-4567</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-space-accent/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-space-steel text-sm font-tech flex items-center gap-2">
            © {currentYear} Smith. Crafted with <FaHeart className="text-red-500" /> for the cosmos.
          </p>
          
          {/* Back to Top */}
          <Link
            to="hero"
            smooth={true}
            duration={500}
          >
            <motion.button
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-2 px-4 py-2 glass rounded-full text-space-accent font-tech text-sm"
            >
              <HiChevronUp />
              Back to Orbit
            </motion.button>
          </Link>
        </div>

        {/* Decorative Stars */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-space-accent/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
