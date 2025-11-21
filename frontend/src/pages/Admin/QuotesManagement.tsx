import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaTrash, FaEye } from 'react-icons/fa';
import './QuotesManagement.css';

interface Quote {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  services: string[];
  projectDescription: string;
  budget?: string;
  timeline?: string;
  status: 'pending' | 'reviewed' | 'quoted' | 'rejected';
  createdAt: string;
}

const QuotesManagement: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    const token = localStorage.getItem('adminToken');
    
    try {
      const response = await fetch('http://localhost:5000/api/quotes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setQuotes(data.data || data);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuoteStatus = async (id: string, status: string) => {
    const token = localStorage.getItem('adminToken');

    try {
      await fetch(`http://localhost:5000/api/quotes/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      fetchQuotes();
    } catch (error) {
      console.error('Error updating quote status:', error);
    }
  };

  const deleteQuote = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this quote?')) return;

    const token = localStorage.getItem('adminToken');

    try {
      await fetch(`http://localhost:5000/api/quotes/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchQuotes();
    } catch (error) {
      console.error('Error deleting quote:', error);
    }
  };

  const filteredQuotes = quotes.filter((quote) => {
    const matchesSearch =
      quote.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.company?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterStatus === 'all' || quote.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#f59e0b';
      case 'reviewed':
        return '#3b82f6';
      case 'quoted':
        return '#10b981';
      case 'rejected':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  if (loading) {
    return <div className="loading-state">Loading quotes...</div>;
  }

  return (
    <div className="quotes-management">
      <div className="management-header">
        <h2>Quote Requests</h2>
        <p>Manage and track customer quote requests</p>
      </div>

      <div className="management-controls">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search by name, email, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-box">
          <FaFilter />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="quoted">Quoted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="quotes-count">
        Showing {filteredQuotes.length} of {quotes.length} quotes
      </div>

      <div className="quotes-list">
        {filteredQuotes.length === 0 ? (
          <div className="empty-state">
            <p>No quotes found</p>
          </div>
        ) : (
          filteredQuotes.map((quote) => (
            <motion.div
              key={quote._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="quote-card"
            >
              <div className="quote-header">
                <div className="quote-info">
                  <h3>{quote.name}</h3>
                  {quote.company && <span className="company">{quote.company}</span>}
                </div>
                <span
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(quote.status) }}
                >
                  {quote.status}
                </span>
              </div>

              <div className="quote-details">
                <div className="detail-item">
                  <strong>Email:</strong> {quote.email}
                </div>
                <div className="detail-item">
                  <strong>Phone:</strong> {quote.phone}
                </div>
                <div className="detail-item">
                  <strong>Services:</strong> {quote.services.join(', ')}
                </div>
                {quote.budget && (
                  <div className="detail-item">
                    <strong>Budget:</strong> {quote.budget}
                  </div>
                )}
                {quote.timeline && (
                  <div className="detail-item">
                    <strong>Timeline:</strong> {quote.timeline}
                  </div>
                )}
                <div className="detail-item full-width">
                  <strong>Description:</strong>
                  <p>{quote.projectDescription}</p>
                </div>
                <div className="detail-item">
                  <strong>Submitted:</strong> {new Date(quote.createdAt).toLocaleString()}
                </div>
              </div>

              <div className="quote-actions">
                <select
                  value={quote.status}
                  onChange={(e) => updateQuoteStatus(quote._id, e.target.value)}
                  className="status-select"
                >
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="quoted">Quoted</option>
                  <option value="rejected">Rejected</option>
                </select>

                <button
                  className="action-btn view"
                  onClick={() => setSelectedQuote(quote)}
                  title="View Details"
                >
                  <FaEye />
                </button>

                <button
                  className="action-btn delete"
                  onClick={() => deleteQuote(quote._id)}
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {selectedQuote && (
        <div className="modal-overlay" onClick={() => setSelectedQuote(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Quote Details</h2>
            <div className="modal-details">
              <p><strong>Name:</strong> {selectedQuote.name}</p>
              <p><strong>Email:</strong> {selectedQuote.email}</p>
              <p><strong>Phone:</strong> {selectedQuote.phone}</p>
              {selectedQuote.company && <p><strong>Company:</strong> {selectedQuote.company}</p>}
              <p><strong>Services:</strong> {selectedQuote.services.join(', ')}</p>
              {selectedQuote.budget && <p><strong>Budget:</strong> {selectedQuote.budget}</p>}
              {selectedQuote.timeline && <p><strong>Timeline:</strong> {selectedQuote.timeline}</p>}
              <p><strong>Description:</strong></p>
              <p>{selectedQuote.projectDescription}</p>
              <p><strong>Status:</strong> <span style={{ color: getStatusColor(selectedQuote.status), fontWeight: 'bold' }}>{selectedQuote.status}</span></p>
              <p><strong>Submitted:</strong> {new Date(selectedQuote.createdAt).toLocaleString()}</p>
            </div>
            <button className="btn-close" onClick={() => setSelectedQuote(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuotesManagement;
