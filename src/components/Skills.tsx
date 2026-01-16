import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Tilt from 'react-parallax-tilt';
import { 
  SiPython, SiCplusplus, SiMatlab, SiJavascript, SiReact, 
  SiDocker, SiKubernetes, SiAmazonaws, SiGit, SiLinux,
  SiTensorflow, SiPytorch, SiOpengl, SiAutodesk
} from 'react-icons/si';
import { 
  FaRocket, FaSatellite, FaCogs, FaBrain, FaDatabase, 
  FaChartLine, FaNetworkWired, FaMicrochip 
} from 'react-icons/fa';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const technicalSkills = [
    { name: 'Propulsion Engineering', level: 95, icon: FaRocket, color: '#00d4ff' },
    { name: 'Orbital Mechanics', level: 92, icon: FaSatellite, color: '#7b2cbf' },
    { name: 'Spacecraft Design', level: 90, icon: FaCogs, color: '#ffd700' },
    { name: 'Flight Dynamics', level: 88, icon: FaChartLine, color: '#ff6b35' },
    { name: 'Systems Engineering', level: 93, icon: FaNetworkWired, color: '#00fff7' },
    { name: 'Avionics Systems', level: 87, icon: FaMicrochip, color: '#e91e63' },
    { name: 'CFD Analysis', level: 85, icon: FaBrain, color: '#4caf50' },
    { name: 'Mission Planning', level: 94, icon: FaDatabase, color: '#9c27b0' },
  ];

  const programmingSkills = [
    { name: 'Python', icon: SiPython, level: 95 },
    { name: 'C/C++', icon: SiCplusplus, level: 92 },
    { name: 'MATLAB', icon: SiMatlab, level: 94 },
    { name: 'JavaScript', icon: SiJavascript, level: 78 },
    { name: 'React', icon: SiReact, level: 75 },
  ];

  const tools = [
    { name: 'ANSYS', icon: FaCogs },
    { name: 'SolidWorks', icon: SiAutodesk },
    { name: 'STK', icon: FaSatellite },
    { name: 'Docker', icon: SiDocker },
    { name: 'AWS', icon: SiAmazonaws },
    { name: 'Git', icon: SiGit },
    { name: 'Linux', icon: SiLinux },
    { name: 'TensorFlow', icon: SiTensorflow },
    { name: 'OpenGL', icon: SiOpengl },
    { name: 'Kubernetes', icon: SiKubernetes },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="skills" className="section py-24 relative">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-space-accent rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-space-purple rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            <span className="gradient-text">Technical Arsenal</span>
          </h2>
          <p className="section-subtitle">ENGINEERING CAPABILITIES</p>
        </motion.div>

        <div ref={ref} className="grid lg:grid-cols-2 gap-16">
          {/* Technical Skills */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <h3 className="font-space text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <FaRocket className="text-space-accent" />
              Core Competencies
            </h3>
            
            <div className="space-y-6">
              {technicalSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <skill.icon className="text-xl" style={{ color: skill.color }} />
                      <span className="font-tech text-space-light">{skill.name}</span>
                    </div>
                    <span className="font-space text-space-accent">{skill.level}%</span>
                  </div>
                  <div className="h-3 bg-space-navy rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ 
                        background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)` 
                      }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Programming & Tools */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-12"
          >
            {/* Programming Languages */}
            <div>
              <h3 className="font-space text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <FaBrain className="text-space-purple" />
                Programming Languages
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {programmingSkills.map((skill, index) => (
                  <Tilt
                    key={index}
                    tiltMaxAngleX={15}
                    tiltMaxAngleY={15}
                    scale={1.05}
                  >
                    <motion.div
                      variants={itemVariants}
                      className="card-space p-6 text-center group cursor-pointer"
                      whileHover={{ borderColor: '#00d4ff' }}
                    >
                      <skill.icon className="text-4xl mx-auto mb-3 text-space-accent group-hover:scale-110 transition-transform" />
                      <h4 className="font-tech font-semibold text-white mb-1">{skill.name}</h4>
                      <div className="w-full h-1 bg-space-navy rounded-full overflow-hidden mt-2">
                        <motion.div
                          className="h-full bg-gradient-to-r from-space-accent to-space-purple"
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        />
                      </div>
                    </motion.div>
                  </Tilt>
                ))}
              </div>
            </div>

            {/* Tools & Software */}
            <div>
              <h3 className="font-space text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <FaCogs className="text-space-gold" />
                Tools & Software
              </h3>
              
              <motion.div
                variants={containerVariants}
                className="flex flex-wrap gap-3"
              >
                {tools.map((tool, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="flex items-center gap-2 px-4 py-2 glass rounded-full cursor-pointer group hover:border-space-accent transition-all"
                  >
                    <tool.icon className="text-lg text-space-accent group-hover:rotate-12 transition-transform" />
                    <span className="font-tech text-space-light">{tool.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Skill Visualization - Orbit */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 flex justify-center"
        >
          <div className="relative w-80 h-80">
            {/* Central Node */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-space-accent to-space-purple flex items-center justify-center z-10"
              animate={{
                boxShadow: [
                  '0 0 30px rgba(0, 212, 255, 0.5)',
                  '0 0 60px rgba(0, 212, 255, 0.7)',
                  '0 0 30px rgba(0, 212, 255, 0.5)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <FaRocket className="text-3xl text-white" />
            </motion.div>

            {/* Orbit Rings */}
            <motion.div
              className="absolute inset-0 border-2 border-space-accent/20 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-6 border border-space-purple/20 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-12 border border-space-gold/20 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            {/* Orbiting Elements */}
            {[0, 60, 120, 180, 240, 300].map((angle, index) => (
              <motion.div
                key={index}
                className="absolute w-10 h-10 rounded-full bg-space-navy border border-space-accent/30 flex items-center justify-center"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${angle}deg) translateX(140px) rotate(-${angle}deg)`,
                }}
                animate={{
                  transform: [
                    `rotate(${angle}deg) translateX(140px) rotate(-${angle}deg)`,
                    `rotate(${angle + 360}deg) translateX(140px) rotate(-${angle - 360}deg)`,
                  ],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-2 h-2 bg-space-accent rounded-full" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
