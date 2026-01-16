import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { FaQuoteLeft, FaStar, FaRocket } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Dr. Sarah Chen',
      role: 'Chief Engineer',
      company: 'NASA JPL',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      content: "Smith's expertise in propulsion systems is unparalleled. His contributions to the Mars mission were instrumental in achieving our objectives. A true pioneer in aerospace engineering.",
      rating: 5,
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      role: 'VP of Engineering',
      company: 'SpaceX',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      content: "Working with Smith on the Raptor engine optimization was incredible. His innovative approach and deep technical knowledge pushed the boundaries of what we thought possible.",
      rating: 5,
    },
    {
      id: 3,
      name: 'Dr. Emily Watson',
      role: 'Mission Director',
      company: 'Blue Origin',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      content: "Smith brings a unique combination of theoretical knowledge and practical engineering skills. His problem-solving abilities during critical phases were exceptional.",
      rating: 5,
    },
    {
      id: 4,
      name: 'James Thompson',
      role: 'Senior Scientist',
      company: 'Lockheed Martin',
      image: 'https://randomuser.me/api/portraits/men/75.jpg',
      content: "I've collaborated with many engineers, but Smith stands out for his dedication to excellence. His work on satellite systems set new industry standards.",
      rating: 5,
    },
    {
      id: 5,
      name: 'Dr. Lisa Park',
      role: 'Research Director',
      company: 'MIT',
      image: 'https://randomuser.me/api/portraits/women/90.jpg',
      content: "Smith's PhD research on combustion dynamics has become a foundational reference in our field. His contributions to academia are as significant as his industry achievements.",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="section py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-space-accent/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-space-purple/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-space-gold/5 rounded-full" />
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
            <span className="gradient-text">Mission Endorsements</span>
          </h2>
          <p className="section-subtitle">TESTIMONIALS FROM COLLABORATORS</p>
        </motion.div>

        {/* Testimonials Slider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Swiper
            modules={[Pagination, Autoplay, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 3, spaceBetween: 40 },
            }}
            className="pb-16"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id} className="py-8">
                <motion.div
                  whileHover={{ y: -10 }}
                  className="card-space p-8 h-full relative"
                >
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 text-space-accent/20">
                    <FaQuoteLeft className="text-4xl" />
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="text-space-gold" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-space-light/80 italic mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4 mt-auto">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-space-accent"
                    />
                    <div>
                      <h4 className="font-tech font-semibold text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-space-accent text-sm">{testimonial.role}</p>
                      <p className="text-space-steel text-xs">{testimonial.company}</p>
                    </div>
                  </div>

                  {/* Decorative Element */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-space-accent via-space-purple to-space-gold rounded-b-xl" />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 glass rounded-2xl p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '100%', label: 'Mission Success Rate' },
              { value: '50+', label: 'Successful Projects' },
              { value: '25+', label: 'Industry Partners' },
              { value: '200+', label: 'Research Citations' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h4 className="font-space text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </h4>
                <p className="font-tech text-space-steel">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Floating Rocket */}
        <motion.div
          className="absolute -right-20 top-1/2 transform -translate-y-1/2 text-space-accent/10"
          animate={{ y: [0, -30, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <FaRocket className="text-[200px] transform -rotate-45" />
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
