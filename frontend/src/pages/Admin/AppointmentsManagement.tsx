import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaTrash, FaEye } from 'react-icons/fa';
import './AppointmentsManagement.css';

interface Appointment {
  _id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}

const AppointmentsManagement: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const token = localStorage.getItem('adminToken');
    
    try {
      const response = await fetch('http://localhost:5000/api/appointments', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setAppointments(data.data || data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (id: string, status: string) => {
    const token = localStorage.getItem('adminToken');

    try {
      await fetch(`http://localhost:5000/api/appointments/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      fetchAppointments();
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };

  const deleteAppointment = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this appointment?')) return;

    const token = localStorage.getItem('adminToken');

    try {
      await fetch(`http://localhost:5000/api/appointments/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchAppointments();
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.service.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterStatus === 'all' || appointment.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#f59e0b';
      case 'confirmed':
        return '#10b981';
      case 'cancelled':
        return '#ef4444';
      case 'completed':
        return '#3b82f6';
      default:
        return '#6b7280';
    }
  };

  if (loading) {
    return <div className="loading-state">Loading appointments...</div>;
  }

  return (
    <div className="appointments-management">
      <div className="management-header">
        <h2>Appointments</h2>
        <p>Manage and schedule customer appointments</p>
      </div>

      <div className="management-controls">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search by name, email, or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-box">
          <FaFilter />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="appointments-count">
        Showing {filteredAppointments.length} of {appointments.length} appointments
      </div>

      <div className="appointments-list">
        {filteredAppointments.length === 0 ? (
          <div className="empty-state">
            <p>No appointments found</p>
          </div>
        ) : (
          filteredAppointments.map((appointment) => (
            <motion.div
              key={appointment._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="appointment-card"
            >
              <div className="appointment-header">
                <div className="appointment-info">
                  <h3>{appointment.name}</h3>
                  <span className="service-tag">{appointment.service}</span>
                </div>
                <span
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(appointment.status) }}
                >
                  {appointment.status}
                </span>
              </div>

              <div className="appointment-details">
                <div className="detail-item">
                  <strong>Email:</strong> {appointment.email}
                </div>
                <div className="detail-item">
                  <strong>Phone:</strong> {appointment.phone}
                </div>
                <div className="detail-item">
                  <strong>Date:</strong> {new Date(appointment.preferredDate).toLocaleDateString()}
                </div>
                <div className="detail-item">
                  <strong>Time:</strong> {appointment.preferredTime}
                </div>
                {appointment.message && (
                  <div className="detail-item full-width">
                    <strong>Message:</strong>
                    <p>{appointment.message}</p>
                  </div>
                )}
                <div className="detail-item">
                  <strong>Requested:</strong> {new Date(appointment.createdAt).toLocaleString()}
                </div>
              </div>

              <div className="appointment-actions">
                <select
                  value={appointment.status}
                  onChange={(e) => updateAppointmentStatus(appointment._id, e.target.value)}
                  className="status-select"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="completed">Completed</option>
                </select>

                <button
                  className="action-btn view"
                  onClick={() => setSelectedAppointment(appointment)}
                  title="View Details"
                >
                  <FaEye />
                </button>

                <button
                  className="action-btn delete"
                  onClick={() => deleteAppointment(appointment._id)}
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {selectedAppointment && (
        <div className="modal-overlay" onClick={() => setSelectedAppointment(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Appointment Details</h2>
            <div className="modal-details">
              <p><strong>Name:</strong> {selectedAppointment.name}</p>
              <p><strong>Email:</strong> {selectedAppointment.email}</p>
              <p><strong>Phone:</strong> {selectedAppointment.phone}</p>
              <p><strong>Service:</strong> {selectedAppointment.service}</p>
              <p><strong>Preferred Date:</strong> {new Date(selectedAppointment.preferredDate).toLocaleDateString()}</p>
              <p><strong>Preferred Time:</strong> {selectedAppointment.preferredTime}</p>
              {selectedAppointment.message && (
                <>
                  <p><strong>Message:</strong></p>
                  <p>{selectedAppointment.message}</p>
                </>
              )}
              <p><strong>Status:</strong> <span style={{ color: getStatusColor(selectedAppointment.status), fontWeight: 'bold' }}>{selectedAppointment.status}</span></p>
              <p><strong>Requested:</strong> {new Date(selectedAppointment.createdAt).toLocaleString()}</p>
            </div>
            <button className="btn-close" onClick={() => setSelectedAppointment(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsManagement;
