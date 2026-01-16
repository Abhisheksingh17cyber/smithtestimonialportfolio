import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { FaRocket, FaPaperPlane, FaMapMarkerAlt, FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import { HiCheckCircle, HiXCircle } from 'react-icons/hi';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // EmailJS configuration - replace with your actual service details
      await emailjs.sendForm(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        formRef.current!,
        'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
      );
      
      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Email send error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: 'Houston, Texas, USA',
      color: '#00d4ff',
    },
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'smith@aerospace.com',
      href: 'mailto:smith@aerospace.com',
      color: '#7b2cbf',
    },
    {
      icon: FaPhone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
      color: '#ffd700',
    },
  ];

  const socialLinks = [
    { icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FaGithub, href: 'https://github.com', label: 'GitHub' },
    { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
  ];

  return (
    <section id="contact" className="section py-24 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-space-accent/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-space-purple/5 rounded-full blur-[150px]" />
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
            <span className="gradient-text">Launch Communication</span>
          </h2>
          <p className="section-subtitle">GET IN TOUCH</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Left Side - Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-space text-3xl font-bold text-white mb-6">
              Let's Build the <span className="gradient-text">Future Together</span>
            </h3>
            <p className="text-space-light/70 mb-8 leading-relaxed">
              Whether you have a groundbreaking aerospace project, need technical consultation, 
              or want to discuss potential collaborations, I'm always excited to connect with 
              fellow space enthusiasts and industry professionals.
            </p>

            {/* Contact Info */}
            <div className="space-y-6 mb-10">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 group"
                >
                  <div
                    className="p-4 rounded-xl"
                    style={{ backgroundColor: `${info.color}20` }}
                  >
                    <info.icon className="text-xl" style={{ color: info.color }} />
                  </div>
                  <div>
                    <p className="text-space-steel text-sm">{info.label}</p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="font-tech text-white hover:text-space-accent transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="font-tech text-white">{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <p className="text-space-steel mb-4">Connect on Social</p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-xl glass flex items-center justify-center text-space-accent hover:glow-accent transition-all"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Decorative Rocket */}
            <motion.div
              className="mt-12 hidden lg:block"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="relative w-48 h-48">
                <motion.div
                  className="absolute inset-0 border-2 border-space-accent/20 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-4 border border-space-purple/20 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <FaRocket className="text-5xl text-space-accent transform -rotate-45" />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit(onSubmit)}
              className="card-space p-8"
            >
              <h4 className="font-space text-xl font-bold text-white mb-6 flex items-center gap-3">
                <FaPaperPlane className="text-space-accent" />
                Send Message
              </h4>

              {/* Name Field */}
              <div className="mb-6">
                <label className="block font-tech text-space-light mb-2">
                  Full Name
                </label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  type="text"
                  className={`w-full px-4 py-3 bg-space-navy/50 border rounded-xl font-tech text-white placeholder-space-steel focus:outline-none focus:border-space-accent transition-colors ${
                    errors.name ? 'border-red-500' : 'border-space-steel/30'
                  }`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="mb-6">
                <label className="block font-tech text-space-light mb-2">
                  Email Address
                </label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  type="email"
                  className={`w-full px-4 py-3 bg-space-navy/50 border rounded-xl font-tech text-white placeholder-space-steel focus:outline-none focus:border-space-accent transition-colors ${
                    errors.email ? 'border-red-500' : 'border-space-steel/30'
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Subject Field */}
              <div className="mb-6">
                <label className="block font-tech text-space-light mb-2">
                  Subject
                </label>
                <input
                  {...register('subject', { required: 'Subject is required' })}
                  type="text"
                  className={`w-full px-4 py-3 bg-space-navy/50 border rounded-xl font-tech text-white placeholder-space-steel focus:outline-none focus:border-space-accent transition-colors ${
                    errors.subject ? 'border-red-500' : 'border-space-steel/30'
                  }`}
                  placeholder="Project Inquiry"
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                )}
              </div>

              {/* Message Field */}
              <div className="mb-6">
                <label className="block font-tech text-space-light mb-2">
                  Message
                </label>
                <textarea
                  {...register('message', {
                    required: 'Message is required',
                    minLength: {
                      value: 10,
                      message: 'Message must be at least 10 characters',
                    },
                  })}
                  rows={5}
                  className={`w-full px-4 py-3 bg-space-navy/50 border rounded-xl font-tech text-white placeholder-space-steel focus:outline-none focus:border-space-accent transition-colors resize-none ${
                    errors.message ? 'border-red-500' : 'border-space-steel/30'
                  }`}
                  placeholder="Tell me about your project..."
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full btn-primary font-tech flex items-center justify-center gap-3 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Transmitting...
                  </>
                ) : (
                  <>
                    <FaRocket />
                    Launch Message
                  </>
                )}
              </motion.button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-green-500/20 border border-green-500 rounded-xl flex items-center gap-3"
                >
                  <HiCheckCircle className="text-green-500 text-xl" />
                  <span className="text-green-500 font-tech">Message transmitted successfully!</span>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-red-500/20 border border-red-500 rounded-xl flex items-center gap-3"
                >
                  <HiXCircle className="text-red-500 text-xl" />
                  <span className="text-red-500 font-tech">Transmission failed. Please try again.</span>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
