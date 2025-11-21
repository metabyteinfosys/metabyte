import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { quoteAPI, QuoteData } from '../../services/api';
import './GetQuote.css';

const GetQuote: React.FC = () => {
  const [formData, setFormData] = useState<QuoteData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    services: [],
    projectDescription: '',
    budget: '',
    timeline: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const availableServices = [
    'Website Development',
    'Mobile App Development',
    'Digital Branding',
    'SEO Services',
    'E-commerce Solutions',
    'Cloud Solutions',
  ];

  const budgetRanges = [
    'Less than $1,000',
    '$1,000 - $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000+',
  ];

  const timelines = [
    'Less than 1 month',
    '1-3 months',
    '3-6 months',
    '6-12 months',
    'More than 12 months',
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.services.length === 0) {
      setError('Please select at least one service');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await quoteAPI.create(formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        services: [],
        projectDescription: '',
        budget: '',
        timeline: '',
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit quote request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="get-quote-page">
      <section className="quote-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="quote-hero-content"
          >
            <h1 className="quote-hero-title">Get a Free Quote</h1>
            <p className="quote-hero-description">
              Tell us about your project and we'll provide you with a detailed quote
            </p>
          </motion.div>
        </div>
      </section>

      <section className="quote-content">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="quote-form-wrapper"
          >
            <form onSubmit={handleSubmit} className="quote-form">
              {success && (
                <div className="alert alert-success">
                  Your quote request has been submitted successfully! We'll get back to you within 24 hours.
                </div>
              )}
              {error && <div className="alert alert-error">{error}</div>}

              <div className="form-section">
                <h3 className="form-section-title">Contact Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Your email ID"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="Your Best phone number"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="company">Company Name</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your Company"
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3 className="form-section-title">Services Required *</h3>
                <div className="services-grid">
                  {availableServices.map((service) => (
                    <div
                      key={service}
                      className={`service-checkbox ${
                        formData.services.includes(service) ? 'selected' : ''
                      }`}
                      onClick={() => handleServiceToggle(service)}
                    >
                      <input
                        type="checkbox"
                        checked={formData.services.includes(service)}
                        onChange={() => {}}
                      />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-section">
                <h3 className="form-section-title">Project Details</h3>
                <div className="form-group">
                  <label htmlFor="projectDescription">Project Description *</label>
                  <textarea
                    id="projectDescription"
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleChange}
                    required
                    placeholder="Describe your project requirements, goals, and any specific features you need..."
                    rows={6}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="budget">Estimated Budget</label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                    >
                      <option value="">Select budget range</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="timeline">Expected Timeline</label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                    >
                      <option value="">Select timeline</option>
                      {timelines.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-large" disabled={loading}>
                {loading ? <span className="loading"></span> : 'Request Quote'}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default GetQuote;
