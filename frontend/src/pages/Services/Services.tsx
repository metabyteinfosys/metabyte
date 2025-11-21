import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaMobile, FaPalette, FaBullhorn, FaSearch, FaRocket, FaPencilRuler, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Services.css';

const Services: React.FC = () => {
  const services = [
    {
      icon: <FaCode />,
      title: 'Website Development',
      description: 'Custom, responsive websites built with cutting-edge technologies like React, Node.js, and modern frameworks. We create fast, scalable, and SEO-friendly websites.',
      features: ['Responsive Design', 'CMS Integration', 'API Development', 'Performance Optimization'],
    },
    {
      icon: <FaMobile />,
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android using React Native, Flutter, and native technologies.',
      features: ['iOS & Android Apps', 'Cross-platform Solutions', 'App Store Deployment', 'Maintenance & Support'],
    },
    {
      icon: <FaPalette />,
      title: 'Digital Branding',
      description: 'Create a unique and memorable brand identity that resonates with your target audience and sets you apart from competitors.',
      features: ['Logo Design', 'Brand Guidelines', 'Visual Identity', 'Brand Strategy'],
    },
    {
      icon: <FaSearch />,
      title: 'SEO Services',
      description: 'Improve your search engine rankings and drive organic traffic with our proven SEO strategies and technical optimization.',
      features: ['Keyword Research', 'On-page SEO', 'Link Building', 'Technical SEO'],
    },
    {
      icon: <FaShoppingCart />,
      title: 'E-commerce Solutions',
      description: 'Full-featured online stores with secure payment gateways, inventory management, and seamless checkout experiences.',
      features: ['Shopping Cart', 'Payment Integration', 'Inventory Management', 'Order Tracking'],
    },
    {
      icon: <FaRocket />,
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and deployment solutions using AWS, Azure, and Google Cloud Platform.',
      features: ['Cloud Migration', 'DevOps', 'Server Management', 'Security'],
    },
  ];

  return (
    <div className="services-page">
      <section className="services-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="services-hero-content"
          >
            <h1 className="services-hero-title">Our Services</h1>
            <p className="services-hero-description">
              Comprehensive IT solutions designed to transform your business and drive growth
            </p>
          </motion.div>
        </div>
      </section>

      <section className="services-content">
        <div className="container">
          <div className="services-grid-page">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="service-card-page"
              >
                <div className="service-card-header">
                  <div className="service-icon-page">{service.icon}</div>
                  <h3 className="service-title-page">{service.title}</h3>
                </div>
                <p className="service-description-page">{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="services-cta-section"
          >
            <h2>Ready to Get Started?</h2>
            <p>Let's discuss your project and create something amazing together</p>
            <div className="services-cta-buttons">
              <Link to="/get-quote" className="btn btn-primary">
                Get a Quote
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
