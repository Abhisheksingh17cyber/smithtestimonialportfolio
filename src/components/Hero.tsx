import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-scroll';
import Tilt from 'react-parallax-tilt';
import { FaRocket, FaSatellite, FaSpaceShuttle } from 'react-icons/fa';
import { HiChevronDown, HiDownload } from 'react-icons/hi';
import { BsLinkedin, BsGithub, BsTwitter } from 'react-icons/bs';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Floating elements animation
  const floatingElements = [
    { icon: FaRocket, delay: 0, x: '10%', y: '20%', size: 40 },
    { icon: FaSatellite, delay: 0.5, x: '85%', y: '30%', size: 50 },
    { icon: FaSpaceShuttle, delay: 1, x: '15%', y: '70%', size: 45 },
  ];

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Floating Space Elements */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute text-space-accent/30"
          style={{ left: element.x, top: element.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 0.3, 
            scale: 1,
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            delay: element.delay,
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <element.icon size={element.size} />
        </motion.div>
      ))}

      {/* Orbital Ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-[600px] h-[600px] border border-space-accent/10 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <motion.div
            className="absolute w-4 h-4 bg-space-accent rounded-full glow-accent"
            style={{ top: 0, left: '50%', transform: 'translateX(-50%)' }}
          />
        </motion.div>
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="container mx-auto px-6 z-content"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="font-tech text-space-light">Available for New Missions</span>
            </motion.div>

            {/* Name */}
            <h1 className="font-space text-5xl md:text-7xl font-bold mb-4">
              <span className="text-space-light">Hi, I'm </span>
              <span className="gradient-text">SMITH</span>
            </h1>

            {/* Animated Title */}
            <div className="font-tech text-2xl md:text-3xl text-space-steel mb-6 h-16">
              <TypeAnimation
                sequence={[
                  'Aerospace Engineer',
                  2000,
                  'Propulsion Specialist',
                  2000,
                  'Spacecraft Designer',
                  2000,
                  'Mission Architect',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-space-accent"
              />
            </div>

            {/* Description */}
            <p className="text-lg text-space-light/70 mb-8 max-w-xl mx-auto lg:mx-0">
              Pioneering the future of space exploration with 10+ years of experience 
              in rocket propulsion systems, satellite design, and interplanetary mission planning. 
              Turning cosmic dreams into engineering reality.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Link to="projects" smooth={true} duration={500}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary font-tech flex items-center gap-2 justify-center"
                >
                  <FaRocket />
                  View My Missions
                </motion.button>
              </Link>
              <motion.a
                href="/Smith_Resume.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary font-tech flex items-center gap-2 justify-center"
              >
                <HiDownload />
                Download Resume
              </motion.a>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center lg:justify-start">
              {[
                { icon: BsLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                { icon: BsGithub, href: 'https://github.com', label: 'GitHub' },
                { icon: BsTwitter, href: 'https://twitter.com', label: 'Twitter' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full glass flex items-center justify-center text-space-accent hover:glow-accent transition-all"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right Content - 3D Card */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 flex justify-center"
          >
            <Tilt
              className="w-[350px] h-[450px]"
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              perspective={1000}
              scale={1.02}
              transitionSpeed={2000}
              gyroscope={true}
            >
              <div className="w-full h-full relative">
                {/* Card Background */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-space-navy via-space-blue to-space-purple opacity-80" />
                
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-3xl animated-border" />
                
                {/* Card Content */}
                <div className="relative h-full p-8 flex flex-col items-center justify-center text-center">
                  {/* Profile Image Placeholder */}
                  <motion.div
                    className="w-40 h-40 rounded-full bg-gradient-to-br from-space-accent to-space-purple mb-6 flex items-center justify-center overflow-hidden border-4 border-space-accent/30"
                    animate={{ 
                      boxShadow: [
                        '0 0 20px rgba(0, 212, 255, 0.3)',
                        '0 0 40px rgba(0, 212, 255, 0.5)',
                        '0 0 20px rgba(0, 212, 255, 0.3)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="font-space text-6xl text-white font-bold">S</span>
                  </motion.div>
                  
                  <h3 className="font-space text-2xl font-bold text-white mb-2">SMITH</h3>
                  <p className="font-tech text-space-accent mb-4">Senior Aerospace Engineer</p>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 w-full mt-4">
                    {[
                      { value: '10+', label: 'Years' },
                      { value: '50+', label: 'Projects' },
                      { value: '15+', label: 'Patents' },
                    ].map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="font-space text-2xl font-bold gradient-text">{stat.value}</div>
                        <div className="font-tech text-xs text-space-steel">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Decorative Elements */}
                  <motion.div
                    className="absolute top-4 right-4 w-8 h-8 text-space-gold"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    <FaSatellite />
                  </motion.div>
                </div>
              </div>
            </Tilt>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <Link to="about" smooth={true} duration={500}>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center cursor-pointer"
          >
            <span className="font-tech text-sm text-space-steel mb-2">Scroll to Explore</span>
            <HiChevronDown className="text-3xl text-space-accent" />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
};

export default Hero;
