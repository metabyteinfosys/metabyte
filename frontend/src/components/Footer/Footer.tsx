import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">
              <span className="logo-text">Metabyte &nbsp;</span>
              <span className="logo-text-accent">Infosys</span>
            </h3>
            <p className="footer-description">
              Transforming businesses through innovative IT solutions. 
              We deliver excellence in web development, mobile apps, and digital marketing.
            </p>
            <div className="social-icons">
              <a href="https://www.facebook.com/metabyteinfosys" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaFacebookF />
              </a>
              <a href="https://x.com/Metabyteinfosys" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaTwitter />
              </a>
              <a href="https://www.linkedin.com/company/metabyteinfosys" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaLinkedinIn />
              </a>
              <a href="https://www.instagram.com/metabyteinfosys/" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaInstagram />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/book-appointment">Book Appointment</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Our Services</h4>
            <ul className="footer-links">
              <li><Link to="/services">Website Development</Link></li>
              <li><Link to="/services">Mobile App Development</Link></li>
              <li><Link to="/services">Digital Branding</Link></li>
              <li><Link to="/services">Digital Marketing</Link></li>
              <li><Link to="/services">SEO Services</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Contact Info</h4>
            <ul className="footer-contact">
              <li>
                <FaMapMarkerAlt className="contact-icon" />
                <span>49 Furzer Street, Phillip, ACT 2606</span>
              </li>
              <li>
                <FaEnvelope className="contact-icon" />
                <span>info@metabyte.com.au</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Metabyte. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
