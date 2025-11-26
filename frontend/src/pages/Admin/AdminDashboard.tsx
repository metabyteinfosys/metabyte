import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import { FaHome, FaFileInvoice, FaCalendarAlt, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import QuotesManagement from './QuotesManagement';
import AppointmentsManagement from './AppointmentsManagement';
import api from '../../services/api';
import './AdminDashboard.css';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [adminInfo, setAdminInfo] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('adminToken');
    const info = localStorage.getItem('adminInfo');

    if (!token || !info) {
      navigate('/admin/login');
      return;
    }

    setAdminInfo(JSON.parse(info));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    navigate('/admin/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!adminInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>Metabyte Admin</h2>
          <button className="sidebar-toggle mobile-only" onClick={toggleSidebar}>
            <FaTimes />
          </button>
        </div>

        <div className="admin-info">
          <div className="admin-avatar">
            {adminInfo.name.charAt(0).toUpperCase()}
          </div>
          <h3>{adminInfo.name}</h3>
          <p>{adminInfo.email}</p>
          <span className="admin-badge">{adminInfo.role}</span>
        </div>

        <nav className="sidebar-nav">
          <Link to="/admin/dashboard" className="nav-item">
            <FaHome /> <span>Dashboard</span>
          </Link>
          <Link to="/admin/dashboard/quotes" className="nav-item">
            <FaFileInvoice /> <span>Quote Requests</span>
          </Link>
          <Link to="/admin/dashboard/appointments" className="nav-item">
            <FaCalendarAlt /> <span>Appointments</span>
          </Link>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> <span>Logout</span>
        </button>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <FaBars />
          </button>
          <h1>Admin Dashboard</h1>
        </header>

        <div className="admin-content">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/quotes" element={<QuotesManagement />} />
            <Route path="/appointments" element={<AppointmentsManagement />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

const DashboardHome: React.FC = () => {
  const [stats, setStats] = useState({
    totalQuotes: 0,
    totalAppointments: 0,
    pendingQuotes: 0,
    pendingAppointments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      
      // The api service will automatically add the auth token
      const [quotesRes, appointmentsRes] = await Promise.all([
        api.get('/quotes'),
        api.get('/appointments'),
      ]);

      const quotes = quotesRes.data.data || quotesRes.data;
      const appointments = appointmentsRes.data.data || appointmentsRes.data;

      console.log('Quotes:', quotes); // Debug log
      console.log('Appointments:', appointments); // Debug log

      setStats({
        totalQuotes: quotes.length,
        totalAppointments: appointments.length,
        pendingQuotes: quotes.filter((q: any) => q.status === 'pending').length,
        pendingAppointments: appointments.filter((a: any) => a.status === 'pending').length,
      });
    } catch (error: any) {
      console.error('Error fetching stats:', error);
      console.error('Error response:', error.response?.data); // Debug log
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-home">
        <h2>Loading dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="dashboard-home">
      <h2>Welcome to Admin Dashboard</h2>
      <p className="dashboard-subtitle">Manage your quotes and appointments</p>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon quotes">
            <FaFileInvoice />
          </div>
          <div className="stat-info">
            <h3>{stats.totalQuotes}</h3>
            <p>Total Quotes</p>
            {stats.pendingQuotes > 0 && (
              <span className="stat-badge">{stats.pendingQuotes} pending</span>
            )}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon appointments">
            <FaCalendarAlt />
          </div>
          <div className="stat-info">
            <h3>{stats.totalAppointments}</h3>
            <p>Total Appointments</p>
            {stats.pendingAppointments > 0 && (
              <span className="stat-badge">{stats.pendingAppointments} pending</span>
            )}
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <Link to="/admin/dashboard/quotes" className="action-btn">
            <FaFileInvoice />
            <span>View Quotes</span>
          </Link>
          <Link to="/admin/dashboard/appointments" className="action-btn">
            <FaCalendarAlt />
            <span>View Appointments</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
