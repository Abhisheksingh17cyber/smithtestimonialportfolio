import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaRocket, FaSatellite, FaSpaceShuttle, FaMeteor } from 'react-icons/fa';
import { HiLocationMarker, HiCalendar } from 'react-icons/hi';

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const experiences = [
    {
      id: 1,
      role: 'Senior Propulsion Engineer',
      company: 'SpaceX',
      location: 'Hawthorne, CA',
      period: '2021 - Present',
      description: 'Leading the development of next-generation Raptor engine components. Optimizing propulsion systems for Starship missions. Collaborating with cross-functional teams on Mars colonization projects.',
      achievements: [
        'Led propulsion system optimization resulting in 15% thrust improvement',
        'Designed critical engine components for Starship program',
        'Managed team of 12 engineers across multiple projects',
        'Filed 5 patents for innovative propulsion technologies'
      ],
      icon: FaRocket,
      color: '#00d4ff'
    },
    {
      id: 2,
      role: 'Spacecraft Systems Engineer',
      company: 'NASA - Jet Propulsion Laboratory',
      location: 'Pasadena, CA',
      period: '2018 - 2021',
      description: 'Contributed to Mars Perseverance rover mission. Designed and tested flight software for autonomous navigation. Participated in mission planning for future deep-space exploration.',
      achievements: [
        'Key contributor to Mars 2020 Perseverance mission',
        'Developed autonomous navigation algorithms',
        'Conducted system-level testing and validation',
        'Published 8 peer-reviewed research papers'
      ],
      icon: FaSatellite,
      color: '#7b2cbf'
    },
    {
      id: 3,
      role: 'Propulsion Test Engineer',
      company: 'Blue Origin',
      location: 'Kent, WA',
      period: '2016 - 2018',
      description: 'Conducted extensive testing of BE-4 rocket engines. Developed test procedures and safety protocols. Analyzed test data and provided recommendations for design improvements.',
      achievements: [
        'Executed 200+ engine hot-fire tests',
        'Developed automated data analysis tools',
        'Improved test efficiency by 30%',
        'Contributed to BE-4 engine certification'
      ],
      icon: FaSpaceShuttle,
      color: '#ffd700'
    },
    {
      id: 4,
      role: 'Aerospace Engineer',
      company: 'Lockheed Martin',
      location: 'Denver, CO',
      period: '2014 - 2016',
      description: 'Supported satellite design and integration for various defense and commercial programs. Performed structural analysis and thermal modeling.',
      achievements: [
        'Designed satellite structural components',
        'Conducted FEA and thermal analysis',
        'Supported launch integration activities',
        'Earned recognition for innovative solutions'
      ],
      icon: FaMeteor,
      color: '#ff6b35'
    }
  ];

  const education = [
    {
      degree: 'Ph.D. in Aerospace Engineering',
      school: 'Massachusetts Institute of Technology (MIT)',
      year: '2014',
      focus: 'Rocket Propulsion & Combustion Dynamics'
    },
    {
      degree: 'M.S. in Aerospace Engineering',
      school: 'Stanford University',
      year: '2010',
      focus: 'Spacecraft Design & Orbital Mechanics'
    },
    {
      degree: 'B.S. in Aerospace Engineering',
      school: 'Georgia Institute of Technology',
      year: '2008',
      focus: 'Aerodynamics & Propulsion'
    }
  ];

  return (
    <section id="experience" className="section py-24 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/3 left-0 w-px h-96 bg-gradient-to-b from-transparent via-space-accent to-transparent"
          animate={{ y: [0, 100, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 right-0 w-px h-96 bg-gradient-to-b from-transparent via-space-purple to-transparent"
          animate={{ y: [0, -100, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
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
            <span className="gradient-text">Mission History</span>
          </h2>
          <p className="section-subtitle">CAREER TRAJECTORY</p>
        </motion.div>

        {/* Timeline */}
        <div ref={ref} className="relative max-w-4xl mx-auto">
          {/* Central Line */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-space-accent via-space-purple to-space-gold"
            initial={{ height: 0 }}
            animate={inView ? { height: '100%' } : { height: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          {/* Experience Items */}
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Content Card */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="card-space p-6"
                >
                  <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                    <div 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `${exp.color}20` }}
                    >
                      <exp.icon className="text-xl" style={{ color: exp.color }} />
                    </div>
                    <div className={index % 2 === 0 ? 'text-right' : 'text-left'}>
                      <h3 className="font-space font-bold text-white">{exp.role}</h3>
                      <p className="font-tech text-space-accent">{exp.company}</p>
                    </div>
                  </div>

                  <div className={`flex items-center gap-4 text-sm text-space-steel mb-4 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                    <span className="flex items-center gap-1">
                      <HiLocationMarker />
                      {exp.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <HiCalendar />
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-space-light/70 text-sm mb-4">{exp.description}</p>

                  <ul className={`space-y-2 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="text-xs text-space-light/60 flex items-center gap-2" style={{ justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start' }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-space-accent" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Center Icon */}
              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 z-10"
                whileHover={{ scale: 1.2 }}
              >
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ 
                    backgroundColor: `${exp.color}20`,
                    border: `3px solid ${exp.color}`,
                    boxShadow: `0 0 20px ${exp.color}50`
                  }}
                >
                  <exp.icon className="text-xl" style={{ color: exp.color }} />
                </div>
              </motion.div>

              {/* Empty Space */}
              <div className="w-5/12" />
            </motion.div>
          ))}
        </div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <h3 className="font-space text-2xl font-bold text-center text-white mb-12">
            <span className="gradient-text">Education</span>
          </h3>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="card-space p-6 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-space-accent to-space-purple flex items-center justify-center">
                  <span className="font-space text-2xl font-bold text-white">{edu.year}</span>
                </div>
                <h4 className="font-tech font-semibold text-white mb-2">{edu.degree}</h4>
                <p className="text-space-accent text-sm mb-2">{edu.school}</p>
                <p className="text-space-steel text-xs">{edu.focus}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
