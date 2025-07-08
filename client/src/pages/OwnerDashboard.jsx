// src/pages/OwnerDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { CircularProgress, Box } from '@mui/material';
import OwnerSidebar from '../components/OwnerSidebar';
import OwnerTopbar from '../components/OwnerTopbar';
import AllCompanyStatsCard from '../components/AllCompanyStatsCard';
import CompanyListTable from '../components/CompanyListTable';
import InviteCompanyForm from '../components/InviteCompanyForm';
import PendingRequestSection from '../components/PendingRequestSection';
import BlockedCompaniesList from '../components/BlockedCompaniesList';

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [ownerData, setOwnerData] = useState(null);
  const [stats, setStats] = useState(null);

  const token = localStorage.getItem('ownerToken');

  useEffect(() => {
    if (!token) {
      return navigate('/');
    }

    let decoded;
    try {
      decoded = jwtDecode(token);
      if (decoded.role !== 'superadmin') {
        return navigate('/');
      }
    } catch (error) {
      return navigate('/');
    }

    // Fetch owner + stats
    const fetchData = async () => {
      try {
        const headers = { 'Authorization': `Bearer ${token}` };

        const [ownerRes, statsRes] = await Promise.all([
          fetch('http://localhost:5000/api/owner/profile', { headers }),
          fetch('http://localhost:5000/api/admin/stats', { headers })
        ]);

        const ownerJson = await ownerRes.json();
        const statsJson = await statsRes.json();

        setOwnerData(ownerJson.owner);
        setStats(statsJson);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        navigate('/');
      }
    };

    fetchData();
  }, [navigate, token]);

  if (loading) {
    return (
      <Box minHeight="100vh" display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size={40} />
      </Box>
    );
  }

  return (
    <Box display="flex" minHeight="100vh">
      <OwnerSidebar />
      <Box flexGrow={1}>
        <OwnerTopbar owner={ownerData} />

        <Box p={2}>
          <AllCompanyStatsCard stats={stats} />
          <InviteCompanyForm />
          <PendingRequestSection />
          <CompanyListTable />
          <BlockedCompaniesList />
        </Box>
      </Box>
    </Box>
  );
};

export default OwnerDashboard;
