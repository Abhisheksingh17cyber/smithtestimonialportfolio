import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Tilt from 'react-parallax-tilt';
import { FaRocket, FaSatelliteDish, FaMeteor, FaUserAstronaut } from 'react-icons/fa';
import { HiLightningBolt, HiGlobe, HiCode, HiChip } from 'react-icons/hi';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { icon: FaRocket, value: '50+', label: 'Missions Completed', color: 'from-space-accent to-space-cyan' },
    { icon: FaSatelliteDish, value: '25+', label: 'Satellites Designed', color: 'from-space-purple to-pink-500' },
    { icon: FaMeteor, value: '15+', label: 'Patents Filed', color: 'from-space-gold to-space-orange' },
    { icon: FaUserAstronaut, value: '10+', label: 'Years Experience', color: 'from-green-400 to-emerald-600' },
  ];

  const highlights = [
    { icon: HiLightningBolt, title: 'Propulsion Systems', desc: 'Expert in liquid and solid rocket propulsion' },
    { icon: HiGlobe, title: 'Orbital Mechanics', desc: 'Trajectory optimization & mission planning' },
    { icon: HiCode, title: 'Flight Software', desc: 'Guidance, navigation & control systems' },
    { icon: HiChip, title: 'Avionics', desc: 'Spacecraft electronics & instrumentation' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="about" className="section py-24">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            <span className="gradient-text">About Me</span>
          </h2>
          <p className="section-subtitle">MISSION PROFILE</p>
        </motion.div>

        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Image & Decorations */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative"
          >
            <Tilt
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              perspective={1000}
              scale={1.02}
              className="relative z-10"
            >
              <motion.div
                variants={itemVariants}
                className="relative rounded-3xl overflow-hidden"
              >
                {/* Main Image Container */}
                <div className="aspect-square bg-gradient-to-br from-space-navy via-space-blue to-space-purple rounded-3xl flex items-center justify-center relative">
                  {/* Animated Ring */}
                  <motion.div
                    className="absolute w-64 h-64 border-2 border-space-accent/30 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute w-48 h-48 border border-space-purple/30 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* Center Content */}
                  <div className="text-center z-10">
                    <motion.div
                      className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-space-accent to-space-purple flex items-center justify-center mb-4"
                      animate={{
                        boxShadow: [
                          '0 0 30px rgba(0, 212, 255, 0.4)',
                          '0 0 60px rgba(0, 212, 255, 0.6)',
                          '0 0 30px rgba(0, 212, 255, 0.4)',
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <FaUserAstronaut className="text-5xl text-white" />
                    </motion.div>
                    <h3 className="font-space text-xl text-white">SMITH</h3>
                    <p className="font-tech text-space-accent">Aerospace Engineer</p>
                  </div>
                </div>

                {/* Decorative Corner Elements */}
                <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-space-accent rounded-tl-3xl" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-space-purple rounded-br-3xl" />
              </motion.div>
            </Tilt>

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-8 -right-8 p-4 glass rounded-2xl"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <FaRocket className="text-3xl text-space-accent" />
            </motion.div>
            <motion.div
              className="absolute -bottom-8 -left-8 p-4 glass rounded-2xl"
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <FaSatelliteDish className="text-3xl text-space-purple" />
            </motion.div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h3 className="font-space text-3xl font-bold text-white mb-4">
                Pioneering the <span className="gradient-text">Final Frontier</span>
              </h3>
              <p className="text-space-light/80 text-lg leading-relaxed mb-6">
                With over a decade of experience in aerospace engineering, I've dedicated my career 
                to pushing the boundaries of what's possible in space exploration. From designing 
                propulsion systems that power rockets to the stars, to architecting satellite 
                constellations that connect our world.
              </p>
              <p className="text-space-light/70 leading-relaxed">
                Currently serving as a Senior Propulsion Engineer, I lead teams in developing 
                next-generation rocket engines and spacecraft systems. My work has contributed 
                to multiple successful missions, including lunar exploration programs and 
                deep-space satellite deployments.
              </p>
            </motion.div>

            {/* Highlights Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4"
            >
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  className="p-4 glass rounded-xl group hover:border-space-accent transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <item.icon className="text-2xl text-space-accent mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="font-tech font-semibold text-white">{item.title}</h4>
                  <p className="text-sm text-space-light/60">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -10 }}
              className="card-space p-6 text-center"
            >
              <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                <stat.icon className="text-3xl text-white" />
              </div>
              <motion.h4
                className="font-space text-4xl font-bold gradient-text mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                {stat.value}
              </motion.h4>
              <p className="font-tech text-space-steel">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
