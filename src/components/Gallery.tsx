import { useState } from 'react';
import { motion } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { FaExpand, FaRocket, FaSatellite } from 'react-icons/fa';

const Gallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const galleryItems = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=1200',
      thumb: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=600',
      title: 'Rocket Engine Testing',
      category: 'Testing',
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200',
      thumb: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600',
      title: 'Satellite Deployment',
      category: 'Missions',
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=1200',
      thumb: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=600',
      title: 'Mars Exploration',
      category: 'Exploration',
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=1200',
      thumb: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=600',
      title: 'Earth from Space',
      category: 'Imagery',
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=1200',
      thumb: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=600',
      title: 'Launch Pad Operations',
      category: 'Operations',
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?w=1200',
      thumb: 'https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?w=600',
      title: 'Lunar Surface',
      category: 'Exploration',
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1457364559154-aa2644600ebb?w=1200',
      thumb: 'https://images.unsplash.com/photo-1457364559154-aa2644600ebb?w=600',
      title: 'Mission Control',
      category: 'Operations',
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=1200',
      thumb: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=600',
      title: 'Night Launch',
      category: 'Missions',
    },
  ];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section id="gallery" className="section py-24 relative">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            <span className="gradient-text">Mission Gallery</span>
          </h2>
          <p className="section-subtitle">VISUAL DOCUMENTATION</p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              className={`relative overflow-hidden rounded-xl cursor-pointer group ${
                index === 0 || index === 5 ? 'col-span-2 row-span-2' : ''
              }`}
              onClick={() => openLightbox(index)}
            >
              <img
                src={item.thumb}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                style={{ minHeight: index === 0 || index === 5 ? '400px' : '200px' }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-space-dark via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h4 className="font-tech font-semibold text-white">{item.title}</h4>
                <p className="text-space-accent text-sm">{item.category}</p>
              </div>

              {/* Expand Icon */}
              <div className="absolute top-4 right-4 p-2 glass rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <FaExpand className="text-space-accent" />
              </div>

              {/* Border Glow */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-space-accent rounded-xl transition-colors duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={galleryItems.map(item => ({ src: item.src }))}
        />

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-20 left-10 text-space-accent/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <FaSatellite className="text-6xl" />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-10 text-space-purple/10"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <FaRocket className="text-6xl transform -rotate-45" />
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
