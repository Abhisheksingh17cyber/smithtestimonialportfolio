import { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaSatellite, FaAtom, FaGlobeAmericas } from 'react-icons/fa';
import { HiSparkles, HiEye, HiLightningBolt, HiChartBar } from 'react-icons/hi';
import { SiNasa } from 'react-icons/si';

// Cosmic Research Card Component
const ResearchCard = ({ 
  title, 
  description, 
  icon: Icon, 
  stats, 
  delay,
  accentColor 
}: { 
  title: string;
  description: string;
  icon: React.ElementType;
  stats: { label: string; value: string }[];
  delay: number;
  accentColor: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className="card-space p-6 group cursor-pointer"
  >
    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${accentColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
      <Icon className="text-white text-xl" />
    </div>
    <h4 className="font-space text-lg font-bold text-white mb-2">{title}</h4>
    <p className="text-space-steel text-sm mb-4 leading-relaxed">{description}</p>
    <div className="grid grid-cols-2 gap-3">
      {stats.map((stat, i) => (
        <div key={i} className="glass p-2 rounded-lg text-center">
          <div className="font-space text-lg font-bold gradient-text">{stat.value}</div>
          <div className="text-[10px] text-space-steel uppercase tracking-wider">{stat.label}</div>
        </div>
      ))}
    </div>
  </motion.div>
);

// Black Hole Visualization Component
const BlackHoleVisualization = () => {
  // Generate accretion disk particles
  const accretionParticles = useMemo(() => 
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      angle: (i / 80) * Math.PI * 2,
      radius: 120 + Math.random() * 60,
      speed: 8 + Math.random() * 4,
      size: Math.random() * 3 + 1,
      brightness: Math.random() * 0.5 + 0.5,
    })), []
  );

  // Generate background stars
  const backgroundStars = useMemo(() => 
    Array.from({ length: 200 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      twinkle: Math.random() * 3 + 2,
    })), []
  );

  // Star being consumed
  const consumedStarParticles = useMemo(() => 
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      delay: i * 0.1,
    })), []
  );

  return (
    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden bg-black">
      {/* Deep Space Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#000005] via-[#05051a] to-[#0a0a25]" />
      
      {/* Background Stars */}
      {backgroundStars.map(star => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.twinkle,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Gravitational Lensing Effect - Outer Ring */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, transparent 40%, rgba(255,150,50,0.03) 50%, transparent 60%)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      {/* Photon Sphere / Light Bending */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full border border-orange-500/20"
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Accretion Disk - Main Ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="relative w-[300px] h-[300px]"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ transformStyle: 'preserve-3d', transform: 'rotateX(75deg)' }}
        >
          {/* Outer Accretion Ring */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, rgba(255,100,0,0.8), rgba(255,200,50,0.9), rgba(255,150,0,0.7), rgba(255,80,0,0.8), rgba(255,200,50,0.9), rgba(255,100,0,0.8))',
              filter: 'blur(2px)',
            }}
          />
          
          {/* Inner Accretion Ring */}
          <div 
            className="absolute top-[30px] left-[30px] right-[30px] bottom-[30px] rounded-full"
            style={{
              background: 'conic-gradient(from 180deg, rgba(255,220,100,0.9), rgba(255,180,50,1), rgba(255,220,100,0.9), rgba(255,150,0,0.8))',
              filter: 'blur(1px)',
            }}
          />

          {/* Hot Inner Edge */}
          <motion.div 
            className="absolute top-[60px] left-[60px] right-[60px] bottom-[60px] rounded-full"
            style={{
              background: 'conic-gradient(from 90deg, rgba(255,255,200,1), rgba(255,255,255,0.9), rgba(255,255,200,1))',
            }}
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>

      {/* Accretion Particles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {accretionParticles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              background: `rgba(255, ${150 + Math.random() * 100}, ${Math.random() * 100}, ${particle.brightness})`,
              boxShadow: `0 0 ${particle.size * 2}px rgba(255, 150, 50, 0.5)`,
              transformOrigin: `${particle.radius}px center`,
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: particle.speed,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Event Horizon (Black Hole Core) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Outer Shadow */}
        <div 
          className="w-[140px] h-[140px] rounded-full"
          style={{
            background: 'radial-gradient(circle, #000 0%, #000 70%, transparent 100%)',
            boxShadow: '0 0 60px 30px rgba(0,0,0,0.8), inset 0 0 30px rgba(0,0,0,1)',
          }}
        />
        
        {/* Inner Void */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] rounded-full bg-black"
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Star Being Consumed */}
      <motion.div
        className="absolute"
        initial={{ top: '20%', right: '25%' }}
        animate={{
          top: ['20%', '35%', '45%'],
          right: ['25%', '35%', '45%'],
          scale: [1, 0.7, 0.3],
          opacity: [1, 0.8, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeIn"
        }}
      >
        {/* Star Core */}
        <motion.div
          className="relative"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div 
            className="w-16 h-16 rounded-full"
            style={{
              background: 'radial-gradient(circle, #fff 0%, #fffacd 30%, #ffd700 60%, #ff8c00 100%)',
              boxShadow: '0 0 40px 15px rgba(255, 200, 50, 0.6), 0 0 80px 30px rgba(255, 150, 0, 0.3)',
            }}
          />
        </motion.div>

        {/* Matter Stream being pulled toward black hole */}
        <div className="absolute top-1/2 left-1/2">
          {consumedStarParticles.map(particle => (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-yellow-200 to-orange-400"
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x: [0, -50, -150],
                y: [0, 30, 80],
                opacity: [1, 0.8, 0],
                scale: [1, 0.5, 0.1],
              }}
              transition={{
                duration: 3,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeIn"
              }}
              style={{
                boxShadow: '0 0 10px rgba(255, 200, 100, 0.8)',
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Relativistic Jets */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {/* Top Jet */}
        <div 
          className="absolute bottom-[70px] left-1/2 -translate-x-1/2 w-4 h-[200px]"
          style={{
            background: 'linear-gradient(to top, rgba(100,150,255,0.8), rgba(150,200,255,0.4), transparent)',
            filter: 'blur(3px)',
            clipPath: 'polygon(30% 100%, 70% 100%, 100% 0%, 0% 0%)',
          }}
        />
        
        {/* Bottom Jet */}
        <div 
          className="absolute top-[70px] left-1/2 -translate-x-1/2 w-4 h-[200px]"
          style={{
            background: 'linear-gradient(to bottom, rgba(100,150,255,0.8), rgba(150,200,255,0.4), transparent)',
            filter: 'blur(3px)',
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)',
          }}
        />
      </motion.div>

      {/* Data Overlay - Top Left */}
      <div className="absolute top-4 left-4 glass p-3 rounded-lg border border-space-accent/20">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="font-tech text-[10px] text-space-steel">OBSERVATION ACTIVE</span>
        </div>
        <div className="font-tech text-xs text-white">
          <div>MASS: <span className="text-space-cyan">6.5×10⁹ M☉</span></div>
          <div>DISTANCE: <span className="text-space-gold">55M ly</span></div>
        </div>
      </div>

      {/* Data Overlay - Bottom Right */}
      <div className="absolute bottom-4 right-4 glass p-3 rounded-lg border border-space-accent/20">
        <div className="font-tech text-[10px] text-space-steel mb-1">EVENT HORIZON</div>
        <div className="font-space text-lg font-bold text-white">
          19.5 <span className="text-xs text-space-steel">billion km</span>
        </div>
      </div>

      {/* Classification Badge */}
      <div className="absolute top-4 right-4">
        <div className="glass px-3 py-1.5 rounded-full border border-purple-500/30">
          <span className="font-tech text-[10px] text-purple-400">SUPERMASSIVE BLACK HOLE</span>
        </div>
      </div>
    </div>
  );
};

// Main Component
const RocketLaunch = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  // Research areas data
  const researchAreas = [
    {
      title: "Black Hole Dynamics",
      description: "Studying gravitational singularities and their effects on spacetime curvature for advanced propulsion research.",
      icon: HiEye,
      stats: [
        { label: "Papers", value: "47" },
        { label: "Citations", value: "2.3K" },
      ],
      accentColor: "from-purple-600 to-violet-600",
    },
    {
      title: "Gravitational Waves",
      description: "Detecting ripples in spacetime from cosmic events to improve spacecraft navigation systems.",
      icon: HiLightningBolt,
      stats: [
        { label: "Detections", value: "156" },
        { label: "Accuracy", value: "99.7%" },
      ],
      accentColor: "from-cyan-600 to-blue-600",
    },
    {
      title: "Stellar Evolution",
      description: "Analyzing star lifecycle data to predict safe interstellar travel corridors.",
      icon: HiSparkles,
      stats: [
        { label: "Stars Mapped", value: "12M" },
        { label: "Systems", value: "847" },
      ],
      accentColor: "from-orange-600 to-red-600",
    },
    {
      title: "Dark Matter Research",
      description: "Investigating invisible mass distribution for next-generation spacecraft shielding.",
      icon: FaAtom,
      stats: [
        { label: "Data Points", value: "89B" },
        { label: "Models", value: "23" },
      ],
      accentColor: "from-space-accent to-purple-600",
    },
  ];

  // Key metrics
  const metrics = [
    { icon: FaSatellite, value: "250+", label: "Missions Contributed", color: "text-space-accent" },
    { icon: HiChartBar, value: "47", label: "Research Publications", color: "text-space-purple" },
    { icon: FaGlobeAmericas, value: "12", label: "Space Agencies", color: "text-space-gold" },
    { icon: HiEye, value: "∞", label: "Cosmic Discoveries", color: "text-space-cyan" },
  ];

  return (
    <section 
      id="rocket-launch" 
      ref={containerRef}
      className="section py-24 relative min-h-screen overflow-hidden"
    >
      {/* Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: parallaxY }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-space-darker via-[#05051a] to-space-dark" />
      </motion.div>

      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-space-accent/30 mb-6"
          >
            <SiNasa className="text-space-accent text-lg" />
            <span className="font-tech text-space-accent text-xs tracking-widest">COSMIC RESEARCH DIVISION</span>
          </motion.div>
          
          <h2 className="font-space text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Deep Space Observatory</span>
          </h2>
          <p className="text-space-steel max-w-2xl mx-auto text-lg">
            Pioneering research in astrophysics and cosmic phenomena to advance 
            humanity's understanding of the universe and enable interstellar exploration.
          </p>
        </motion.div>

        {/* Main Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="relative">
            {/* Title Bar */}
            <div className="glass border border-space-accent/20 rounded-t-2xl px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="font-tech text-sm text-space-steel">M87* BLACK HOLE — LIVE OBSERVATION</span>
              </div>
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-2 h-2 rounded-full bg-green-500"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="font-tech text-xs text-green-400">STREAMING</span>
              </div>
            </div>

            {/* Black Hole Visualization */}
            <BlackHoleVisualization />

            {/* Bottom Bar */}
            <div className="glass border border-space-accent/20 border-t-0 rounded-b-2xl px-6 py-3">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span className="font-tech text-xs text-space-steel">TELESCOPE:</span>
                    <span className="font-tech text-xs text-white">Event Horizon Array</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-tech text-xs text-space-steel">WAVELENGTH:</span>
                    <span className="font-tech text-xs text-space-cyan">1.3mm Radio</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-tech text-xs text-space-steel">RESOLUTION:</span>
                  <span className="font-tech text-xs text-space-gold">20 μas</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Research Areas Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="font-space text-2xl font-bold text-white text-center mb-8">
            Active Research Programs
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {researchAreas.map((area, i) => (
              <ResearchCard
                key={i}
                title={area.title}
                description={area.description}
                icon={area.icon}
                stats={area.stats}
                delay={i * 0.1}
                accentColor={area.accentColor}
              />
            ))}
          </div>
        </motion.div>

        {/* Metrics Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 rounded-xl border border-space-accent/10 text-center group hover:border-space-accent/30 transition-colors"
            >
              <metric.icon className={`text-3xl ${metric.color} mx-auto mb-3 group-hover:scale-110 transition-transform`} />
              <div className="font-space text-3xl font-bold text-white mb-1">{metric.value}</div>
              <div className="text-space-steel text-sm font-tech">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="glass p-8 rounded-2xl border border-space-accent/10 max-w-3xl mx-auto">
            <blockquote className="font-space text-xl md:text-2xl text-white italic mb-4">
              "The universe is under no obligation to make sense to you, but through 
              dedicated research, we can unravel its deepest mysteries."
            </blockquote>
            <cite className="text-space-steel font-tech text-sm">
              — Aerospace Research Philosophy
            </cite>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RocketLaunch;
