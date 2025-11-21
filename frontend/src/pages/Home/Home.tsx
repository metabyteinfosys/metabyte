import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCode, FaMobile, FaPalette, FaBullhorn, FaSearch, FaRocket, 
  FaCheckCircle, FaUsers, FaLightbulb, FaClock, FaAward, 
  FaQuoteLeft, FaChevronLeft, FaChevronRight, FaPlay
} from 'react-icons/fa';
import './Home.css';

const Home: React.FC = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const services = [
    {
      icon: <FaCode />,
      title: 'Website Development',
      description: 'Custom, responsive websites built with modern technologies and best practices.',
      features: ['React & Next.js', 'WordPress', 'E-commerce', 'CMS Integration']
    },
    {
      icon: <FaMobile />,
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      features: ['iOS & Android', 'React Native', 'Flutter', 'App Store Launch']
    },
    {
      icon: <FaPalette />,
      title: 'Digital Branding',
      description: 'Create a unique brand identity that resonates with your target audience.',
      features: ['Logo Design', 'Brand Guidelines', 'Visual Identity', 'Rebranding']
    },
    {
      icon: <FaBullhorn />,
      title: 'Digital Marketing',
      description: 'Comprehensive digital marketing strategies to grow your business online.',
      features: ['Social Media', 'Content Marketing', 'Email Campaigns', 'PPC Ads']
    },
    {
      icon: <FaSearch />,
      title: 'SEO Services',
      description: 'Improve your search engine rankings and drive organic traffic.',
      features: ['Keyword Research', 'On-Page SEO', 'Link Building', 'Analytics']
    },
    {
      icon: <FaRocket />,
      title: 'E-commerce Solutions',
      description: 'Full-featured online stores with secure payment gateways.',
      features: ['Shopify', 'WooCommerce', 'Payment Gateway', 'Inventory System']
    },
  ];

  const whyChooseUs = [
    {
      icon: <FaUsers />,
      title: 'Expert Team',
      description: 'Our team professionals brings yearss of combined experience in cutting-edge technologies.'
    },
    {
      icon: <FaClock />,
      title: 'On-Time Delivery',
      description: '100% of our projects are delivered on or before the deadline with zero compromise on quality.'
    },
    {
      icon: <FaLightbulb />,
      title: 'Innovative Solutions',
      description: 'We leverage the latest technologies and creative approaches to solve complex business challenges.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: 'TechStart Inc.',
      role: 'CEO',
      content: 'Metabyte transformed our online presence completely. Their team delivered a stunning website that increased our conversions by 150%. Highly professional and responsive!',
      rating: 5
    },
    {
      name: 'Michael Chen',
      company: 'GlobalRetail Co.',
      role: 'Marketing Director',
      content: 'The mobile app they developed for us exceeded all expectations. User engagement increased by 200% within the first month. Their attention to detail is remarkable.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      company: 'Fashion Forward',
      role: 'Founder',
      content: 'From branding to e-commerce development, Metabyte handled everything flawlessly. Our sales tripled in just 6 months. Best investment we ever made!',
      rating: 5
    },
    {
      name: 'David Thompson',
      company: 'HealthTech Solutions',
      role: 'CTO',
      content: 'Their technical expertise and project management skills are top-notch. They delivered our complex healthcare platform on time and within budget.',
      rating: 5
    }
  ];



  const processSteps = [
    {
      number: '01',
      title: 'Discovery',
      description: 'We analyze your business goals, target audience, and technical requirements to create a comprehensive project roadmap.'
    },
    {
      number: '02',
      title: 'Design',
      description: 'Our designers create stunning mockups and prototypes that align with your brand identity and user experience goals.'
    },
    {
      number: '03',
      title: 'Development',
      description: 'Expert developers bring designs to life using cutting-edge technologies and best practices for optimal performance.'
    },
    {
      number: '04',
      title: 'Launch',
      description: 'We thoroughly test, deploy, and monitor your project to ensure a smooth launch and continued success.'
    }
  ];

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-text"
          >
            <h1 className="hero-title">
              Transform Your Business with
              <span className="gradient-text"> Innovative IT Solutions</span>
            </h1>
            <p className="hero-description">
              We deliver cutting-edge web development, mobile apps, and digital marketing services
              to help your business thrive in the digital age.
            </p>
            <div className="hero-buttons">
              <Link to="/get-quote" className="btn btn-primary">
                Get a Free Quote
              </Link>
              <Link to="/services" className="btn btn-secondary">
                Our Services
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hero-image"
          >
            <div className="hero-image-placeholder">
              <div className="floating-element element-1"></div>
              <div className="floating-element element-2"></div>
              <div className="floating-element element-3"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2 className="section-title">Our Services</h2>
            <p className="section-description">
              Comprehensive IT solutions tailored to your business needs
            </p>
          </motion.div>

          <div className="services-grid">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="service-card"
              >
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <ul className="service-features-list">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>
                      <FaCheckCircle className="check-icon" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="services-cta">
            <Link to="/services" className="btn btn-primary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2 className="section-title">Why Choose Metabyte?</h2>
            <p className="section-description">
              We combine technical expertise with creative innovation to deliver exceptional results
            </p>
          </motion.div>

          <div className="why-choose-grid">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="why-choose-card"
              >
                <div className="why-choose-icon">{item.icon}</div>
                <h3 className="why-choose-title">{item.title}</h3>
                <p className="why-choose-description">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
     
      {/* Testimonials Section
      <section className="testimonials-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-description">
              Don't just take our word for it - hear from businesses we've helped transform
            </p>
          </motion.div>

          <div className="testimonial-slider">
            <button className="testimonial-nav prev" onClick={prevTestimonial}>
              <FaChevronLeft />
            </button>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="testimonial-card"
              >
                <FaQuoteLeft className="quote-icon" />
                <p className="testimonial-content">
                  {testimonials[activeTestimonial].content}
                </p>
                <div className="testimonial-rating">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <span key={i} className="star">★</span>
                  ))}
                </div>
                <div className="testimonial-author">
                  <div className="author-info">
                    <h4 className="author-name">{testimonials[activeTestimonial].name}</h4>
                    <p className="author-role">
                      {testimonials[activeTestimonial].role}, {testimonials[activeTestimonial].company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <button className="testimonial-nav next" onClick={nextTestimonial}>
              <FaChevronRight />
            </button>
          </div>

          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === activeTestimonial ? 'active' : ''}`}
                onClick={() => setActiveTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </section> */}


      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="cta-content"
          >
            <h2 className="cta-title">Ready to Start Your Project?</h2>
            <p className="cta-description">
              Let's discuss how we can help transform your business with our expert IT solutions.
            </p>
            <div className="cta-buttons">
              <Link to="/get-quote" className="btn btn-primary">
                Get a  Free Quote
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
