import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Tilt from 'react-parallax-tilt';
import { FaRocket, FaSatellite, FaSpaceShuttle, FaMeteor, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { HiCode, HiChip, HiCube } from 'react-icons/hi';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Missions' },
    { id: 'propulsion', label: 'Propulsion' },
    { id: 'spacecraft', label: 'Spacecraft' },
    { id: 'software', label: 'Software' },
    { id: 'research', label: 'Research' },
  ];

  const projects = [
    {
      id: 1,
      title: 'Raptor Engine Optimization',
      category: 'propulsion',
      description: 'Led the optimization of SpaceX Raptor engine combustion chamber, achieving 15% thrust improvement while reducing manufacturing complexity.',
      image: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=600',
      technologies: ['CFD Analysis', 'MATLAB', 'Python', 'ANSYS'],
      icon: FaRocket,
      color: '#00d4ff',
      github: '#',
      live: '#',
      featured: true
    },
    {
      id: 2,
      title: 'Mars Perseverance Navigation',
      category: 'software',
      description: 'Developed autonomous terrain navigation algorithms for Mars Perseverance rover, enabling safe traversal of complex Martian landscapes.',
      image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=600',
      technologies: ['C++', 'Python', 'ROS', 'Machine Learning'],
      icon: FaSatellite,
      color: '#7b2cbf',
      github: '#',
      live: '#',
      featured: true
    },
    {
      id: 3,
      title: 'Satellite Constellation Design',
      category: 'spacecraft',
      description: 'Architected orbital mechanics for a 100+ satellite constellation providing global broadband coverage with minimal orbital debris risk.',
      image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600',
      technologies: ['STK', 'MATLAB', 'Python', 'GMAT'],
      icon: FaSpaceShuttle,
      color: '#ffd700',
      github: '#',
      live: '#',
      featured: true
    },
    {
      id: 4,
      title: 'Lunar Lander Propulsion',
      category: 'propulsion',
      description: 'Designed throttleable propulsion system for lunar lander enabling precise touchdown and abort capabilities.',
      image: 'https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?w=600',
      technologies: ['Propulsion Design', 'CAD', 'FEA', 'Testing'],
      icon: FaMeteor,
      color: '#ff6b35',
      github: '#',
      live: '#',
      featured: false
    },
    {
      id: 5,
      title: 'Flight Control Software',
      category: 'software',
      description: 'Developed flight control algorithms for autonomous rocket landing, implementing real-time trajectory optimization.',
      image: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=600',
      technologies: ['C++', 'Real-time Systems', 'Control Theory'],
      icon: HiCode,
      color: '#00fff7',
      github: '#',
      live: '#',
      featured: false
    },
    {
      id: 6,
      title: 'Combustion Dynamics Research',
      category: 'research',
      description: 'Published groundbreaking research on combustion instabilities in liquid rocket engines, cited 200+ times.',
      image: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=600',
      technologies: ['Research', 'CFD', 'Experimental Testing'],
      icon: HiChip,
      color: '#e91e63',
      github: '#',
      live: '#',
      featured: false
    },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="section py-24 relative">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-space-accent/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-space-purple/5 rounded-full blur-[100px]" />
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
            <span className="gradient-text">Mission Portfolio</span>
          </h2>
          <p className="section-subtitle">ENGINEERING PROJECTS</p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full font-tech transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-space-accent to-space-purple text-white'
                  : 'glass text-space-light hover:border-space-accent'
              }`}
            >
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Featured Projects */}
        <div ref={ref} className="mb-16">
          <h3 className="font-space text-xl text-space-accent mb-8 text-center">Featured Missions</h3>
          <div className="grid lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {filteredProjects.filter(p => p.featured).map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Tilt
                    tiltMaxAngleX={10}
                    tiltMaxAngleY={10}
                    scale={1.02}
                    transitionSpeed={2000}
                  >
                    <motion.div
                      whileHover={{ y: -10 }}
                      className="card-space overflow-hidden group h-full"
                    >
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-space-dark to-transparent" />
                        
                        {/* Icon Badge */}
                        <div 
                          className="absolute top-4 right-4 p-3 rounded-xl"
                          style={{ backgroundColor: `${project.color}20`, border: `1px solid ${project.color}` }}
                        >
                          <project.icon className="text-xl" style={{ color: project.color }} />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h4 className="font-space text-xl font-bold text-white mb-3 group-hover:text-space-accent transition-colors">
                          {project.title}
                        </h4>
                        <p className="text-space-light/70 text-sm mb-4 line-clamp-3">
                          {project.description}
                        </p>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.slice(0, 3).map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 text-xs font-tech bg-space-navy rounded-full text-space-accent"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Links */}
                        <div className="flex gap-4">
                          <a
                            href={project.github}
                            className="flex items-center gap-2 text-sm text-space-steel hover:text-space-accent transition-colors"
                          >
                            <FaGithub /> Code
                          </a>
                          <a
                            href={project.live}
                            className="flex items-center gap-2 text-sm text-space-steel hover:text-space-accent transition-colors"
                          >
                            <FaExternalLinkAlt /> Details
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  </Tilt>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Other Projects Grid */}
        <div>
          <h3 className="font-space text-xl text-space-purple mb-8 text-center">Other Missions</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {filteredProjects.filter(p => !p.featured).map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="glass p-6 rounded-xl group cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="p-3 rounded-lg shrink-0"
                      style={{ backgroundColor: `${project.color}20` }}
                    >
                      <project.icon className="text-xl" style={{ color: project.color }} />
                    </div>
                    <div>
                      <h4 className="font-tech font-semibold text-white group-hover:text-space-accent transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-space-light/60 text-sm mt-2 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex gap-2 mt-3">
                        {project.technologies.slice(0, 2).map((tech, i) => (
                          <span key={i} className="text-xs text-space-accent">
                            {tech}{i < 1 && ' •'}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary font-tech"
          >
            View All Missions
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
