import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaTrophy, FaMedal, FaCertificate, FaStar, 
  FaAward, FaGraduationCap, FaRocket, FaGlobe 
} from 'react-icons/fa';
import { HiSparkles, HiBadgeCheck, HiLightningBolt } from 'react-icons/hi';
import { SiNasa, SiSpacex } from 'react-icons/si';

// Achievement Card Component with 3D tilt effect
const AchievementCard = ({
  icon: Icon,
  title,
  organization,
  year,
  description,
  highlight,
  index,
}: {
  icon: React.ElementType;
  title: string;
  organization: string;
  year: string;
  description: string;
  highlight?: boolean;
  index: number;
}) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        y: -10, 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className={`relative group ${highlight ? 'md:col-span-2' : ''}`}
    >
      {/* Glow effect */}
      {highlight && (
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-space-accent via-space-purple to-space-cyan rounded-2xl opacity-30 blur-lg group-hover:opacity-50 transition-opacity"
          animate={{ 
            scale: [1, 1.02, 1],
            opacity: [0.3, 0.4, 0.3]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      )}
      
      <div className={`relative card-space p-6 h-full ${highlight ? 'bg-gradient-to-br from-space-dark/90 to-space-darker/90' : ''}`}>
        {/* Badge */}
        {highlight && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={inView ? { scale: 1, rotate: 0 } : {}}
            transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
            className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-space-gold to-yellow-600 rounded-full flex items-center justify-center shadow-lg shadow-space-gold/30"
          >
            <FaStar className="text-white text-xl" />
          </motion.div>
        )}

        <div className="flex items-start gap-4">
          {/* Icon */}
          <motion.div
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
            transition={{ duration: 0.4 }}
            className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
              highlight 
                ? 'bg-gradient-to-br from-space-accent to-space-purple' 
                : 'bg-gradient-to-br from-space-accent/20 to-space-purple/20'
            }`}
          >
            <Icon className={`text-2xl ${highlight ? 'text-white' : 'text-space-accent'}`} />
          </motion.div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-space-gold font-tech text-xs tracking-wider">{year}</span>
              {highlight && <HiBadgeCheck className="text-green-400 text-lg" />}
            </div>
            <h4 className="font-space text-lg font-bold text-white mb-1 group-hover:text-space-accent transition-colors">
              {title}
            </h4>
            <p className="text-space-cyan text-sm font-tech mb-2">{organization}</p>
            <p className="text-space-steel text-sm leading-relaxed">{description}</p>
          </div>
        </div>

        {/* Animated border */}
        <motion.div
          className="absolute inset-0 rounded-xl border border-space-accent/0 group-hover:border-space-accent/30"
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = '', label, icon: Icon }: {
  value: number;
  suffix?: string;
  label: string;
  icon: React.ElementType;
}) => {
  const [ref, inView] = useInView({ triggerOnce: true });
  const springValue = useSpring(0, { stiffness: 50, damping: 20 });

  if (inView) {
    springValue.set(value);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ type: "spring", stiffness: 100 }}
      className="text-center group"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
        className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-space-accent/20 to-space-purple/20 flex items-center justify-center group-hover:from-space-accent/30 group-hover:to-space-purple/30 transition-all"
      >
        <Icon className="text-2xl text-space-accent group-hover:text-space-cyan transition-colors" />
      </motion.div>
      <motion.div className="font-space text-4xl font-bold gradient-text mb-1">
        {Math.round(springValue.get())}{suffix}
      </motion.div>
      <div className="text-space-steel text-sm font-tech">{label}</div>
    </motion.div>
  );
};

// Certification Badge Component
const CertificationBadge = ({ name, issuer, logo: Logo, index }: {
  name: string;
  issuer: string;
  logo: React.ElementType;
  index: number;
}) => {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ x: 10 }}
      className="flex items-center gap-4 glass p-4 rounded-xl border border-space-accent/10 hover:border-space-accent/30 transition-all group cursor-pointer"
    >
      <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
        <Logo className="text-2xl text-space-accent" />
      </div>
      <div className="flex-1">
        <h5 className="font-space text-sm font-semibold text-white group-hover:text-space-accent transition-colors">{name}</h5>
        <p className="text-space-steel text-xs">{issuer}</p>
      </div>
      <HiSparkles className="text-space-gold opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
};

// Main Achievements Component
const Achievements = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const achievements = [
    {
      icon: FaTrophy,
      title: "NASA Excellence Award",
      organization: "National Aeronautics and Space Administration",
      year: "2024",
      description: "Recognized for outstanding contributions to the Artemis program's propulsion systems, achieving 15% efficiency improvement.",
      highlight: true,
    },
    {
      icon: FaMedal,
      title: "AIAA Best Paper Award",
      organization: "American Institute of Aeronautics and Astronautics",
      year: "2023",
      description: "Award-winning research on hypersonic vehicle thermal protection systems.",
      highlight: false,
    },
    {
      icon: FaCertificate,
      title: "SpaceX Innovation Grant",
      organization: "SpaceX Foundation",
      year: "2023",
      description: "Competitive grant for developing novel rocket engine cooling mechanisms.",
      highlight: false,
    },
    {
      icon: FaAward,
      title: "ESA Technical Achievement",
      organization: "European Space Agency",
      year: "2022",
      description: "Awarded for contributions to Mars sample return mission trajectory optimization.",
      highlight: true,
    },
    {
      icon: FaGraduationCap,
      title: "MIT Aerospace Fellowship",
      organization: "Massachusetts Institute of Technology",
      year: "2021",
      description: "Prestigious fellowship for doctoral research in advanced propulsion systems.",
      highlight: false,
    },
    {
      icon: FaRocket,
      title: "Young Engineer of the Year",
      organization: "International Astronautical Federation",
      year: "2020",
      description: "Recognized as one of the most promising aerospace engineers under 30.",
      highlight: false,
    },
  ];

  const certifications = [
    { name: "Systems Engineering Professional", issuer: "INCOSE", logo: HiBadgeCheck },
    { name: "Project Management Professional", issuer: "PMI", logo: FaCertificate },
    { name: "NASA Flight Readiness Certified", issuer: "NASA", logo: SiNasa },
    { name: "SpaceX Mission Specialist", issuer: "SpaceX", logo: SiSpacex },
  ];

  const stats = [
    { value: 15, suffix: "+", label: "Major Awards", icon: FaTrophy },
    { value: 47, suffix: "", label: "Publications", icon: FaCertificate },
    { value: 12, suffix: "", label: "Patents Filed", icon: HiLightningBolt },
    { value: 99, suffix: "%", label: "Mission Success", icon: FaRocket },
  ];

  return (
    <section 
      id="rocket-launch" 
      ref={containerRef}
      className="section py-24 relative min-h-screen overflow-hidden"
    >
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-space-darker via-[#0a0a20] to-space-dark" />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-space-accent/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      <motion.div 
        className="container mx-auto px-6 relative z-10"
        style={{ opacity }}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-space-gold/30 mb-6"
          >
            <FaTrophy className="text-space-gold" />
            <span className="font-tech text-space-gold text-xs tracking-widest">ACHIEVEMENTS & RECOGNITION</span>
          </motion.div>
          
          <h2 className="font-space text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Awards & Honors</span>
          </h2>
          <p className="text-space-steel max-w-2xl mx-auto text-lg">
            A track record of excellence recognized by leading aerospace organizations 
            and institutions around the world.
          </p>
        </motion.div>

        {/* Stats Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, i) => (
            <AnimatedCounter key={i} {...stat} />
          ))}
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {achievements.map((achievement, i) => (
            <AchievementCard key={i} {...achievement} index={i} />
          ))}
        </div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-space p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-space-cyan to-blue-600 flex items-center justify-center">
              <FaGlobe className="text-white text-lg" />
            </div>
            <div>
              <h3 className="font-space text-xl font-bold text-white">Professional Certifications</h3>
              <p className="text-space-steel text-sm">Industry-recognized credentials and qualifications</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {certifications.map((cert, i) => (
              <CertificationBadge key={i} {...cert} index={i} />
            ))}
          </div>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-block glass p-8 rounded-2xl border border-space-accent/10 max-w-3xl">
            <HiSparkles className="text-3xl text-space-gold mx-auto mb-4" />
            <blockquote className="font-space text-xl md:text-2xl text-white italic mb-4">
              "Excellence is not a destination but a continuous journey of pushing 
              the boundaries of what's possible in aerospace engineering."
            </blockquote>
            <cite className="text-space-steel font-tech text-sm">— Smith, Aerospace Engineer</cite>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Achievements;
