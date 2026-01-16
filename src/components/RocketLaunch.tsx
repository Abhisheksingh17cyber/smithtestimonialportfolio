import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FaRocket, FaSatellite, FaGlobeAmericas, FaSpaceShuttle } from 'react-icons/fa';
import { HiChip, HiCog, HiLightningBolt, HiStatusOnline } from 'react-icons/hi';
import { SiNasa } from 'react-icons/si';

// Aerospace Mission Data Component
const MissionDataCard = ({ title, value, unit, icon: Icon, delay }: { 
  title: string; 
  value: string; 
  unit: string; 
  icon: React.ElementType;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="glass p-4 rounded-xl border border-space-accent/20 hover:border-space-accent/50 transition-all group"
  >
    <div className="flex items-center gap-3 mb-2">
      <div className="p-2 rounded-lg bg-space-accent/20 group-hover:bg-space-accent/30 transition-colors">
        <Icon className="text-space-accent text-lg" />
      </div>
      <span className="text-space-steel text-xs font-tech uppercase tracking-wider">{title}</span>
    </div>
    <div className="flex items-baseline gap-1">
      <span className="font-space text-2xl font-bold text-white">{value}</span>
      <span className="text-space-steel text-sm">{unit}</span>
    </div>
  </motion.div>
);

// Telemetry Display Component
const TelemetryDisplay = ({ isLaunched }: { isLaunched: boolean }) => {
  const [altitude, setAltitude] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [fuel, setFuel] = useState(100);
  const [gForce, setGForce] = useState(1.0);

  useEffect(() => {
    if (isLaunched) {
      const interval = setInterval(() => {
        setAltitude(prev => Math.min(prev + Math.random() * 500 + 200, 100000));
        setVelocity(prev => Math.min(prev + Math.random() * 100 + 50, 28000));
        setFuel(prev => Math.max(prev - Math.random() * 2, 0));
        setGForce(prev => {
          const newG = prev + (Math.random() - 0.3) * 0.5;
          return Math.max(1, Math.min(newG, 4.5));
        });
      }, 100);
      return () => clearInterval(interval);
    } else {
      setAltitude(0);
      setVelocity(0);
      setFuel(100);
      setGForce(1.0);
    }
  }, [isLaunched]);

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="glass p-3 rounded-lg">
        <div className="text-xs text-space-steel font-tech mb-1">ALTITUDE</div>
        <div className="font-mono text-lg text-space-cyan">
          {altitude.toFixed(0).padStart(6, '0')} <span className="text-xs">m</span>
        </div>
      </div>
      <div className="glass p-3 rounded-lg">
        <div className="text-xs text-space-steel font-tech mb-1">VELOCITY</div>
        <div className="font-mono text-lg text-space-gold">
          {velocity.toFixed(0).padStart(5, '0')} <span className="text-xs">km/h</span>
        </div>
      </div>
      <div className="glass p-3 rounded-lg">
        <div className="text-xs text-space-steel font-tech mb-1">FUEL</div>
        <div className="relative h-2 bg-space-darker rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${fuel > 30 ? 'bg-green-500' : fuel > 10 ? 'bg-yellow-500' : 'bg-red-500'}`}
            initial={{ width: '100%' }}
            animate={{ width: `${fuel}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <div className="font-mono text-sm text-white mt-1">{fuel.toFixed(1)}%</div>
      </div>
      <div className="glass p-3 rounded-lg">
        <div className="text-xs text-space-steel font-tech mb-1">G-FORCE</div>
        <div className={`font-mono text-lg ${gForce > 3 ? 'text-red-400' : gForce > 2 ? 'text-yellow-400' : 'text-green-400'}`}>
          {gForce.toFixed(2)} <span className="text-xs">G</span>
        </div>
      </div>
    </div>
  );
};

// System Status Indicator
const SystemStatus = ({ name, status }: { name: string; status: 'nominal' | 'warning' | 'critical' }) => {
  const colors = {
    nominal: 'bg-green-500',
    warning: 'bg-yellow-500',
    critical: 'bg-red-500'
  };
  
  return (
    <div className="flex items-center justify-between py-2 border-b border-space-accent/10 last:border-0">
      <span className="text-space-steel text-sm font-tech">{name}</span>
      <div className="flex items-center gap-2">
        <motion.div
          className={`w-2 h-2 rounded-full ${colors[status]}`}
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <span className={`text-xs uppercase font-bold ${
          status === 'nominal' ? 'text-green-400' : 
          status === 'warning' ? 'text-yellow-400' : 'text-red-400'
        }`}>
          {status}
        </span>
      </div>
    </div>
  );
};

// Main Rocket Launch Component
const RocketLaunch = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLaunched, setIsLaunched] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [phase, setPhase] = useState<'pre-launch' | 'ignition' | 'liftoff' | 'ascent' | 'orbit'>('pre-launch');
  const [showParticles, setShowParticles] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  // Countdown and launch sequence
  const startLaunch = () => {
    if (isLaunched) {
      // Reset
      setIsLaunched(false);
      setCountdown(5);
      setPhase('pre-launch');
      setShowParticles(false);
      return;
    }

    setPhase('ignition');
    let count = 5;
    
    const countdownInterval = setInterval(() => {
      count--;
      setCountdown(count);
      
      if (count === 2) {
        setShowParticles(true);
      }
      
      if (count === 0) {
        clearInterval(countdownInterval);
        setPhase('liftoff');
        setIsLaunched(true);
        
        setTimeout(() => setPhase('ascent'), 2000);
        setTimeout(() => setPhase('orbit'), 5000);
      }
    }, 1000);
  };

  // Generate atmospheric particles
  const atmosphericParticles = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 2,
    duration: Math.random() * 1 + 0.5,
    size: Math.random() * 3 + 1,
  }));

  // Stars for space background
  const stars = Array.from({ length: 150 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.5 + 0.3,
    twinkle: Math.random() * 3 + 1,
  }));

  return (
    <section 
      id="rocket-launch" 
      ref={containerRef}
      className="section py-24 relative min-h-screen overflow-hidden"
    >
      {/* Dynamic Space-to-Atmosphere Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <div className={`absolute inset-0 transition-all duration-1000 ${
          phase === 'orbit' 
            ? 'bg-gradient-to-b from-black via-[#0a0a20] to-[#1a1a40]' 
            : 'bg-gradient-to-b from-[#0a0a20] via-[#1a1a40] to-[#2a2a60]'
        }`} />
      </motion.div>

      {/* Stars Background */}
      <div className="absolute inset-0">
        {stars.map(star => (
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
              opacity: [star.opacity, star.opacity * 0.3, star.opacity],
            }}
            transition={{
              duration: star.twinkle,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Atmospheric Glow Effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
        animate={{
          opacity: phase === 'orbit' ? 0 : 0.6,
        }}
        transition={{ duration: 2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 via-cyan-500/10 to-transparent" />
      </motion.div>

      {/* Earth Curvature (visible during orbit) */}
      <AnimatePresence>
        {phase === 'orbit' && (
          <motion.div
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-[400px]"
          >
            <div className="w-full h-full rounded-t-[50%] bg-gradient-to-b from-blue-400 via-blue-600 to-blue-800 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/40 via-transparent to-green-600/40" />
              <motion.div
                className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-cyan-300/50 to-transparent"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-space-accent/30 mb-6"
          >
            <SiNasa className="text-space-accent text-xl" />
            <span className="font-tech text-space-accent text-sm">AEROSPACE MISSION SIMULATOR</span>
          </motion.div>
          
          <h2 className="section-title">
            <span className="gradient-text">Launch Control Center</span>
          </h2>
          <p className="section-subtitle">EXPERIENCE THE THRILL OF SPACE EXPLORATION</p>
        </motion.div>

        {/* Mission Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <MissionDataCard title="Thrust" value="7.6" unit="MN" icon={HiLightningBolt} delay={0} />
          <MissionDataCard title="Payload" value="22,800" unit="kg" icon={HiChip} delay={0.1} />
          <MissionDataCard title="Stages" value="2" unit="active" icon={HiCog} delay={0.2} />
          <MissionDataCard title="Systems" value="100%" unit="ready" icon={HiStatusOnline} delay={0.3} />
        </div>

        {/* Main Launch Area */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Panel - System Status */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card-space p-6"
          >
            <h3 className="font-space text-lg font-bold text-white mb-4 flex items-center gap-2">
              <HiCog className="text-space-accent animate-spin" style={{ animationDuration: '8s' }} />
              System Diagnostics
            </h3>
            <div className="space-y-1">
              <SystemStatus name="Main Engine" status="nominal" />
              <SystemStatus name="Navigation" status="nominal" />
              <SystemStatus name="Life Support" status="nominal" />
              <SystemStatus name="Communications" status="nominal" />
              <SystemStatus name="Power Systems" status="nominal" />
              <SystemStatus name="Thermal Control" status="nominal" />
              <SystemStatus name="Guidance Computer" status="nominal" />
              <SystemStatus name="Propellant Feed" status="nominal" />
            </div>
          </motion.div>

          {/* Center - Rocket Launch Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Launch Pad */}
            <div className="relative h-[500px] flex flex-col items-center justify-end overflow-hidden rounded-2xl bg-gradient-to-b from-transparent via-space-dark/50 to-space-darker border border-space-accent/20">
              
              {/* Atmospheric Particles during launch */}
              <AnimatePresence>
                {isLaunched && phase !== 'orbit' && (
                  <div className="absolute inset-0 overflow-hidden">
                    {atmosphericParticles.map(particle => (
                      <motion.div
                        key={particle.id}
                        className="absolute w-1 bg-white/30 rounded-full"
                        style={{
                          left: `${particle.x}%`,
                          height: particle.size * 20,
                        }}
                        initial={{ top: '-10%', opacity: 0 }}
                        animate={{ 
                          top: '110%',
                          opacity: [0, 0.8, 0]
                        }}
                        transition={{
                          duration: particle.duration,
                          delay: particle.delay,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    ))}
                  </div>
                )}
              </AnimatePresence>

              {/* Rocket */}
              <motion.div
                className="absolute z-20"
                initial={{ bottom: '80px' }}
                animate={
                  isLaunched
                    ? { 
                        bottom: phase === 'orbit' ? '60%' : phase === 'ascent' ? '50%' : '150px',
                        scale: phase === 'orbit' ? 0.6 : 1
                      }
                    : { bottom: '80px' }
                }
                transition={{ 
                  duration: phase === 'liftoff' ? 2 : phase === 'ascent' ? 3 : 2,
                  ease: [0.25, 0.46, 0.45, 0.94] // Smooth easing
                }}
              >
                {/* Main Rocket Body */}
                <div className="relative">
                  {/* Nose Cone */}
                  <motion.div
                    className="w-0 h-0 mx-auto"
                    style={{
                      borderLeft: '24px solid transparent',
                      borderRight: '24px solid transparent',
                      borderBottom: '40px solid #e8e8e8',
                    }}
                    animate={isLaunched ? { 
                      filter: ['drop-shadow(0 0 10px #ff6b00)', 'drop-shadow(0 0 20px #ff6b00)']
                    } : {}}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                  />
                  
                  {/* Upper Stage */}
                  <div className="w-12 h-20 mx-auto bg-gradient-to-b from-gray-100 to-gray-200 relative">
                    {/* Window */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-cyan-300 via-blue-400 to-blue-600 border-2 border-gray-400 shadow-inner">
                      <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-white/60" />
                    </div>
                    {/* USA Text */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] font-bold text-blue-800 font-tech">USA</div>
                  </div>

                  {/* Interstage */}
                  <div className="w-14 h-4 mx-auto bg-gradient-to-b from-gray-600 to-gray-700" />

                  {/* Lower Stage (Booster) */}
                  <div className="w-14 h-28 mx-auto bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 relative">
                    {/* Stripes */}
                    <div className="absolute top-4 left-0 right-0 h-3 bg-gradient-to-b from-red-500 to-red-600" />
                    <div className="absolute top-10 left-0 right-0 h-1.5 bg-blue-600" />
                    {/* SpaceX Style Logo Area */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[6px] font-bold text-gray-700 font-tech">FALCON</div>
                  </div>

                  {/* Engine Section */}
                  <div className="w-16 h-6 mx-auto bg-gradient-to-b from-gray-500 to-gray-800 rounded-b-lg relative">
                    {/* Engine Bells */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-1">
                      <div className="w-3 h-4 bg-gradient-to-b from-gray-600 to-gray-900 rounded-b-full" />
                      <div className="w-4 h-5 bg-gradient-to-b from-gray-600 to-gray-900 rounded-b-full" />
                      <div className="w-3 h-4 bg-gradient-to-b from-gray-600 to-gray-900 rounded-b-full" />
                    </div>
                  </div>

                  {/* Fins */}
                  <div className="absolute bottom-6 -left-4 w-5 h-12 bg-gradient-to-l from-gray-300 to-gray-400 transform skew-x-12 origin-bottom-right" />
                  <div className="absolute bottom-6 -right-4 w-5 h-12 bg-gradient-to-r from-gray-300 to-gray-400 transform -skew-x-12 origin-bottom-left" />

                  {/* Exhaust Flame */}
                  <AnimatePresence>
                    {(showParticles || isLaunched) && (
                      <motion.div
                        className="absolute -bottom-16 left-1/2 -translate-x-1/2"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                      >
                        {/* Outer Flame */}
                        <motion.div
                          className="w-14 h-32 rounded-b-full bg-gradient-to-b from-yellow-200 via-orange-400 to-red-600 blur-sm"
                          animate={{
                            height: [120, 140, 120],
                            opacity: [0.9, 1, 0.9],
                          }}
                          transition={{ duration: 0.15, repeat: Infinity }}
                        />
                        {/* Inner Flame */}
                        <motion.div
                          className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-24 rounded-b-full bg-gradient-to-b from-white via-yellow-100 to-orange-300"
                          animate={{
                            height: [90, 100, 90],
                          }}
                          transition={{ duration: 0.1, repeat: Infinity }}
                        />
                        {/* Core */}
                        <motion.div
                          className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-16 rounded-b-full bg-white"
                          animate={{
                            height: [60, 70, 60],
                          }}
                          transition={{ duration: 0.08, repeat: Infinity }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Smoke/Exhaust Clouds */}
                <AnimatePresence>
                  {(showParticles || isLaunched) && (
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute rounded-full bg-gray-300/60"
                          style={{
                            width: Math.random() * 30 + 20,
                            height: Math.random() * 30 + 20,
                          }}
                          initial={{ 
                            x: 0, 
                            y: 0, 
                            scale: 0.5,
                            opacity: 0.8 
                          }}
                          animate={{
                            x: (Math.random() - 0.5) * 150,
                            y: Math.random() * 80 + 20,
                            scale: [0.5, 2, 3],
                            opacity: [0.8, 0.4, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            delay: i * 0.08,
                            repeat: Infinity,
                            ease: "easeOut"
                          }}
                        />
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Launch Tower Structure */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48">
                {/* Main Platform */}
                <div className="h-20 bg-gradient-to-b from-gray-700 to-gray-900 rounded-t-lg relative">
                  {/* Support Arms */}
                  <motion.div
                    className="absolute top-2 -left-2 w-16 h-3 bg-gray-600 origin-right"
                    animate={isLaunched ? { rotate: -45 } : { rotate: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.div
                    className="absolute top-2 -right-2 w-16 h-3 bg-gray-600 origin-left"
                    animate={isLaunched ? { rotate: 45 } : { rotate: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  {/* Warning Lights */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <motion.div
                      className="w-2 h-2 rounded-full bg-red-500"
                      animate={{ opacity: showParticles || isLaunched ? [1, 0.3, 1] : 0.3 }}
                      transition={{ duration: 0.3, repeat: Infinity }}
                    />
                    <motion.div
                      className="w-2 h-2 rounded-full bg-yellow-500"
                      animate={{ opacity: showParticles ? [1, 0.3, 1] : 0.3 }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    />
                  </div>
                </div>

                {/* Ground */}
                <div className="h-4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded-b-lg" />
              </div>

              {/* Countdown Display Overlay */}
              <div className="absolute top-4 left-4 right-4">
                <div className="glass p-4 rounded-xl border border-space-accent/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-tech text-xs text-space-steel">MISSION STATUS</span>
                    <span className={`font-tech text-xs px-2 py-1 rounded ${
                      phase === 'pre-launch' ? 'bg-blue-500/20 text-blue-400' :
                      phase === 'ignition' ? 'bg-yellow-500/20 text-yellow-400' :
                      phase === 'liftoff' ? 'bg-orange-500/20 text-orange-400' :
                      phase === 'ascent' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {phase.toUpperCase().replace('-', ' ')}
                    </span>
                  </div>
                  <div className="text-center">
                    <motion.div
                      className={`font-space text-5xl font-bold ${
                        countdown <= 2 ? 'text-red-500' : 
                        countdown <= 4 ? 'text-yellow-500' : 
                        'gradient-text'
                      }`}
                      animate={phase === 'ignition' ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      {phase === 'pre-launch' ? 'READY' : 
                       phase === 'ignition' ? `T-${countdown}` :
                       phase === 'liftoff' ? 'LIFTOFF!' :
                       phase === 'ascent' ? 'ASCENDING' :
                       'IN ORBIT'}
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>

            {/* Launch Button */}
            <motion.button
              onClick={startLaunch}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full mt-6 py-4 rounded-xl font-space font-bold text-lg transition-all ${
                isLaunched
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                  : 'bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white shadow-lg shadow-orange-500/30'
              }`}
            >
              {isLaunched ? (
                <span className="flex items-center justify-center gap-2">
                  <FaRocket className="animate-bounce" /> RESET MISSION
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <FaRocket /> INITIATE LAUNCH SEQUENCE
                </span>
              )}
            </motion.button>
          </motion.div>

          {/* Right Panel - Telemetry & Mission Control */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Telemetry */}
            <div className="card-space p-6">
              <h3 className="font-space text-lg font-bold text-white mb-4 flex items-center gap-2">
                <HiStatusOnline className="text-green-400" />
                Live Telemetry
              </h3>
              <TelemetryDisplay isLaunched={isLaunched} />
            </div>

            {/* Mission Objectives */}
            <div className="card-space p-6">
              <h3 className="font-space text-lg font-bold text-white mb-4 flex items-center gap-2">
                <FaSatellite className="text-space-purple" />
                Mission Objectives
              </h3>
              <div className="space-y-3">
                {[
                  { task: 'Primary booster ignition', done: phase !== 'pre-launch' },
                  { task: 'Clear launch tower', done: isLaunched },
                  { task: 'Max-Q throttle adjustment', done: phase === 'ascent' || phase === 'orbit' },
                  { task: 'Stage separation', done: phase === 'orbit' },
                  { task: 'Achieve stable orbit', done: phase === 'orbit' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                      item.done ? 'bg-green-500/10' : 'bg-space-accent/5'
                    }`}
                    animate={item.done ? { x: [0, 5, 0] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        item.done ? 'border-green-500 bg-green-500' : 'border-space-steel'
                      }`}
                      animate={item.done ? { scale: [1, 1.2, 1] } : {}}
                    >
                      {item.done && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </motion.div>
                    <span className={`text-sm ${item.done ? 'text-green-400' : 'text-space-steel'}`}>
                      {item.task}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          {[
            { icon: FaRocket, value: '250+', label: 'Successful Missions', color: 'text-space-accent' },
            { icon: FaSatellite, value: '180+', label: 'Satellites Deployed', color: 'text-space-purple' },
            { icon: FaSpaceShuttle, value: '12', label: 'Crewed Flights', color: 'text-space-gold' },
            { icon: FaGlobeAmericas, value: '99.7%', label: 'Mission Success Rate', color: 'text-green-400' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-space p-6 hover:border-space-accent/40 transition-colors"
            >
              <stat.icon className={`text-3xl ${stat.color} mx-auto mb-3`} />
              <div className="font-space text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-space-steel text-sm font-tech">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default RocketLaunch;
