import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaAward, FaLightbulb, FaHandshake } from 'react-icons/fa';
import './About.css';

const About: React.FC = () => {
  const values = [
    {
      icon: <FaLightbulb />,
      title: 'Innovation',
      description: 'We stay ahead of technology trends to deliver cutting-edge solutions.',
    },
    {
      icon: <FaAward />,
      title: 'Excellence',
      description: 'We maintain the highest standards in every project we undertake.',
    },
    {
      icon: <FaUsers />,
      title: 'Collaboration',
      description: 'We work closely with our clients as partners in their success.',
    },
    {
      icon: <FaHandshake />,
      title: 'Integrity',
      description: 'We build trust through transparency and honest communication.',
    },
  ];

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="about-hero-content"
          >
            <h1 className="about-hero-title">About Metabyte</h1>
            <p className="about-hero-description">
              Transforming businesses through innovative technology solutions since 2013
            </p>
          </motion.div>
        </div>
      </section>

      <section className="about-story">
        <div className="container">
          <div className="about-story-content">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="about-story-text"
            >
              <h2>Our Story</h2>
              <p>
                Metabyte was founded with a vision to help businesses thrive in the digital age. 
                What started as a small team of passionate developers has grown into a full-service 
                IT solutions company serving clients worldwide.
              </p>
              <p>
                Over the years, we've delivered hundreds of successful projects, ranging from 
                simple websites to complex enterprise applications. Our commitment to excellence 
                and innovation has made us a trusted partner for businesses of all sizes.
              </p>
              <p>
                Today, we continue to push boundaries, explore new technologies, and deliver 
                solutions that make a real difference to our clients' bottom line.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="about-story-image"
            >
              <div className="about-image-placeholder">
                <div className="about-stat">
                  <h3>100%</h3>
                  <p>Client Satisfaction</p>
                </div>
                <div className="about-stat">
                  <h3>50+</h3>
                  <p>Projects Delivered</p>
                </div>
                <div className="about-stat">
                  <h3>24/7</h3>
                  <p>Support Available</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2 className="section-title">Our Values</h2>
            <p className="section-description">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="values-grid">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="value-card"
              >
                <div className="value-icon">{value.icon}</div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="about-cta-content"
          >
            <h2>Ready to Work Together?</h2>
            <p>Let's create something amazing for your business</p>
            <div className="about-cta-buttons">
              <a href="/contact" className="btn btn-primary">
                Get in Touch
              </a>
              <a href="/services" className="btn btn-secondary">
                View Services
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
