import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { FaRocket, FaSatellite, FaMoon } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const RocketLaunch = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const [isLaunched, setIsLaunched] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [showExplosion, setShowExplosion] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rocketY = useTransform(scrollYProgress, [0, 1], [100, -200]);
  const starsOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  useEffect(() => {
    if (isInView && !isLaunched) {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsLaunched(true);
            setShowExplosion(true);
            setTimeout(() => setShowExplosion(false), 1000);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isInView, isLaunched]);

  const resetLaunch = () => {
    setIsLaunched(false);
    setCountdown(10);
  };

  // Generate random stars
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 2,
  }));

  // Planets
  const planets = [
    { name: 'Mars', color: '#ff6b35', size: 60, x: 15, y: 20 },
    { name: 'Jupiter', color: '#ffd700', size: 90, x: 80, y: 30 },
    { name: 'Saturn', color: '#daa520', size: 70, x: 75, y: 70, hasRing: true },
  ];

  return (
    <section 
      id="rocket-launch" 
      ref={containerRef}
      className="section py-24 relative min-h-screen overflow-hidden"
    >
      {/* Deep Space Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-space-darker via-[#0a0a20] to-space-dark" />
      
      {/* Animated Stars Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ opacity: starsOpacity }}
      >
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
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2,
              delay: star.delay,
              repeat: Infinity,
            }}
          />
        ))}
      </motion.div>

      {/* Nebula Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(123, 44, 191, 0.4) 0%, transparent 70%)',
            top: '10%',
            right: '-10%',
          }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%)',
            bottom: '20%',
            left: '-5%',
          }}
          animate={{ scale: [1.2, 1, 1.2], rotate: [45, 0, 45] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>

      {/* Planets */}
      {planets.map((planet, index) => (
        <motion.div
          key={planet.name}
          className="absolute"
          style={{ left: `${planet.x}%`, top: `${planet.y}%` }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.3 }}
        >
          <motion.div
            className="relative"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5 + index, repeat: Infinity }}
          >
            <div
              className="rounded-full"
              style={{
                width: planet.size,
                height: planet.size,
                background: `radial-gradient(circle at 30% 30%, ${planet.color}, ${planet.color}88 50%, ${planet.color}44)`,
                boxShadow: `0 0 30px ${planet.color}44`,
              }}
            />
            {planet.hasRing && (
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 rounded-full"
                style={{
                  width: planet.size * 1.6,
                  height: planet.size * 0.4,
                  borderColor: `${planet.color}66`,
                  transform: 'translate(-50%, -50%) rotateX(70deg)',
                }}
              />
            )}
          </motion.div>
        </motion.div>
      ))}

      {/* Moon */}
      <motion.div
        className="absolute top-20 left-20"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 relative overflow-hidden">
          <div className="absolute w-4 h-4 rounded-full bg-gray-400 top-4 left-6" />
          <div className="absolute w-6 h-6 rounded-full bg-gray-400 bottom-4 right-4" />
          <div className="absolute w-3 h-3 rounded-full bg-gray-400 top-8 right-6" />
        </div>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            <span className="gradient-text">Mission Launch Simulator</span>
          </h2>
          <p className="section-subtitle">INTERACTIVE ROCKET LAUNCH EXPERIENCE</p>
        </motion.div>

        {/* Launch Pad Area */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16">
          {/* Launch Platform */}
          <motion.div
            className="relative w-full max-w-md"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {/* Launch Pad Structure */}
            <div className="relative h-[500px] flex flex-col items-center justify-end">
              {/* Rocket */}
              <motion.div
                className="absolute bottom-24 z-20"
                style={{ y: isLaunched ? rocketY : 0 }}
                animate={isLaunched ? {
                  y: [-50, -800],
                  x: [0, 50, -30, 100],
                } : {}}
                transition={{ duration: 3, ease: "easeIn" }}
              >
                {/* Rocket Body */}
                <div className="relative">
                  {/* Main Body */}
                  <div className="w-16 h-40 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 rounded-t-full relative mx-auto">
                    {/* Nose Cone */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[20px] border-r-[20px] border-b-[32px] border-l-transparent border-r-transparent border-b-red-500" />
                    
                    {/* Window */}
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-300 to-blue-500 border-4 border-gray-400">
                      <div className="w-2 h-2 bg-white rounded-full absolute top-1 left-1 opacity-60" />
                    </div>
                    
                    {/* Body Stripes */}
                    <div className="absolute top-20 left-0 right-0 h-2 bg-red-500" />
                    <div className="absolute top-24 left-0 right-0 h-1 bg-blue-500" />
                    
                    {/* USA Text */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 font-bold text-xs text-blue-800">
                      USA
                    </div>
                  </div>
                  
                  {/* Fins */}
                  <div className="absolute -bottom-2 -left-6 w-8 h-16 bg-gradient-to-r from-red-600 to-red-500 transform skew-x-12 rounded-b" />
                  <div className="absolute -bottom-2 -right-6 w-8 h-16 bg-gradient-to-l from-red-600 to-red-500 transform -skew-x-12 rounded-b" />
                  
                  {/* Engine Nozzle */}
                  <div className="w-12 h-8 bg-gradient-to-b from-gray-600 to-gray-800 mx-auto rounded-b-lg" />
                  
                  {/* Flame */}
                  {(isLaunched || countdown <= 3) && (
                    <motion.div
                      className="absolute -bottom-20 left-1/2 transform -translate-x-1/2"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: [1, 1.2, 1], opacity: 1 }}
                      transition={{ duration: 0.2, repeat: Infinity }}
                    >
                      <div className="w-10 h-24 bg-gradient-to-b from-yellow-300 via-orange-500 to-red-600 rounded-b-full blur-sm" />
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-16 bg-gradient-to-b from-white via-yellow-200 to-orange-400 rounded-b-full" />
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Explosion Effect */}
              {showExplosion && (
                <motion.div
                  className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: [0, 3, 4], opacity: [1, 0.8, 0] }}
                  transition={{ duration: 1 }}
                >
                  <div className="w-32 h-32 bg-gradient-radial from-yellow-300 via-orange-500 to-transparent rounded-full blur-lg" />
                </motion.div>
              )}

              {/* Smoke Particles */}
              {(isLaunched || countdown <= 3) && (
                <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-8 h-8 bg-gray-400 rounded-full opacity-60"
                      initial={{ x: 0, y: 0, scale: 0.5 }}
                      animate={{
                        x: (Math.random() - 0.5) * 200,
                        y: Math.random() * 100,
                        scale: [0.5, 2, 3],
                        opacity: [0.6, 0.3, 0],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.1,
                        repeat: Infinity,
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Launch Pad Base */}
              <div className="absolute bottom-0 w-full">
                <div className="w-48 h-20 mx-auto bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 rounded-t-lg relative">
                  {/* Support Structure */}
                  <div className="absolute -top-32 left-0 w-4 h-32 bg-gray-600 transform -rotate-12" />
                  <div className="absolute -top-32 right-0 w-4 h-32 bg-gray-600 transform rotate-12" />
                  
                  {/* Warning Lights */}
                  <motion.div
                    className="absolute top-2 left-4 w-3 h-3 rounded-full bg-red-500"
                    animate={{ opacity: countdown <= 5 ? [1, 0, 1] : 0.3 }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute top-2 right-4 w-3 h-3 rounded-full bg-red-500"
                    animate={{ opacity: countdown <= 5 ? [0, 1, 0] : 0.3 }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  />
                </div>
                
                {/* Ground */}
                <div className="w-64 h-4 mx-auto bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded-b-lg" />
              </div>
            </div>
          </motion.div>

          {/* Control Panel */}
          <motion.div
            className="card-space p-8 w-full max-w-md"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-space text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <HiSparkles className="text-space-gold" />
              Mission Control
            </h3>

            {/* Countdown Display */}
            <div className="text-center mb-8">
              <div className="text-sm font-tech text-space-steel mb-2">T-MINUS</div>
              <motion.div
                className={`font-space text-7xl font-bold ${
                  countdown <= 3 ? 'text-red-500' : countdown <= 5 ? 'text-space-gold' : 'gradient-text'
                }`}
                animate={countdown <= 5 ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                {isLaunched ? 'LIFTOFF!' : countdown.toString().padStart(2, '0')}
              </motion.div>
              <div className="text-sm font-tech text-space-steel mt-2">SECONDS</div>
            </div>

            {/* Status Indicators */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { label: 'Fuel', value: '100%', status: 'green' },
                { label: 'Engine', value: 'Ready', status: 'green' },
                { label: 'Navigation', value: 'Online', status: 'green' },
                { label: 'Comms', value: 'Active', status: 'green' },
              ].map((item, i) => (
                <div key={i} className="glass p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-space-steel text-xs">{item.label}</span>
                    <span className={`w-2 h-2 rounded-full ${
                      item.status === 'green' ? 'bg-green-500' : 'bg-yellow-500'
                    } animate-pulse`} />
                  </div>
                  <div className="font-tech text-white">{item.value}</div>
                </div>
              ))}
            </div>

            {/* Launch/Reset Button */}
            <motion.button
              onClick={resetLaunch}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full py-4 rounded-xl font-space font-bold text-lg transition-all ${
                isLaunched
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                  : 'bg-gradient-to-r from-red-500 to-orange-600 text-white animate-pulse'
              }`}
            >
              {isLaunched ? '🚀 RESET MISSION' : '🔥 INITIATING LAUNCH...'}
            </motion.button>

            {/* Mission Stats */}
            <div className="mt-6 pt-6 border-t border-space-accent/20">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <FaRocket className="text-2xl text-space-accent mx-auto mb-2" />
                  <div className="font-space text-xl font-bold text-white">250</div>
                  <div className="text-xs text-space-steel">Missions</div>
                </div>
                <div>
                  <FaSatellite className="text-2xl text-space-purple mx-auto mb-2" />
                  <div className="font-space text-xl font-bold text-white">180</div>
                  <div className="text-xs text-space-steel">Satellites</div>
                </div>
                <div>
                  <FaMoon className="text-2xl text-space-gold mx-auto mb-2" />
                  <div className="font-space text-xl font-bold text-white">12</div>
                  <div className="text-xs text-space-steel">Moon Missions</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Orbital Path Visualization */}
        <motion.div
          className="mt-20 relative h-64 overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {/* Earth */}
          <motion.div
            className="absolute left-1/4 top-1/2 transform -translate-y-1/2"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 via-blue-600 to-green-400 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <div className="absolute w-16 h-8 bg-green-500/40 top-4 left-2 rounded-full transform rotate-12" />
              <div className="absolute w-12 h-6 bg-green-500/40 bottom-6 right-2 rounded-full transform -rotate-12" />
            </div>
          </motion.div>

          {/* Orbital Ring */}
          <motion.div
            className="absolute left-1/4 top-1/2 transform -translate-y-1/2"
            animate={{ rotateX: 70 }}
          >
            <motion.div
              className="w-[500px] h-[500px] border border-space-accent/30 rounded-full"
              style={{ transform: 'translate(-40%, -50%)' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {/* Orbiting Satellite */}
              <motion.div
                className="absolute -top-3 left-1/2 transform -translate-x-1/2"
              >
                <FaSatellite className="text-2xl text-space-gold" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Destination Mars */}
          <motion.div
            className="absolute right-1/4 top-1/2 transform -translate-y-1/2"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-400 via-red-600 to-orange-700 relative">
              <div className="absolute w-4 h-2 bg-red-800 top-3 left-4 rounded-full" />
              <div className="absolute w-3 h-3 bg-red-800 bottom-4 right-3 rounded-full" />
            </div>
            <div className="text-center mt-2 font-tech text-space-steel text-sm">Mars</div>
          </motion.div>

          {/* Journey Line */}
          <motion.div
            className="absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-space-accent via-space-purple to-space-gold"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.5 }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default RocketLaunch;
