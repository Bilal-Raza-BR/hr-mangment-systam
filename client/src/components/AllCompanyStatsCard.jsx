import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  CircularProgress
} from '@mui/material';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LockIcon from '@mui/icons-material/Lock';
import GroupIcon from '@mui/icons-material/Group';
import { toast } from 'react-toastify';

const AllCompanyStatsCard = () => {
  const [stats, setStats] = useState({
    totalCompanies: 0,
    blockedCompanies: 0,
    totalEmployees: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/owner/company-stats");
      const data = await res.json();
      if (res.ok) {
        setStats(data);
      } else {
        toast.error(data.message || "Failed to fetch stats");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const StatCard = ({ icon, label, value, color }) => (
    <Paper elevation={4} sx={{ p: 3, borderRadius: 4, textAlign: 'center' }}>
      <Box sx={{ mb: 1, color }}>{icon}</Box>
      <Typography variant="h6" fontWeight="bold">{value}</Typography>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
    </Paper>
  );

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Company Overview
      </Typography>

      {loading ? (
        <Box textAlign="center"><CircularProgress /></Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              icon={<ApartmentIcon sx={{ fontSize: 40 }} />}
              label="Total Companies"
              value={stats.totalCompanies}
              color="primary.main"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              icon={<LockIcon sx={{ fontSize: 40 }} />}
              label="Blocked Companies"
              value={stats.blockedCompanies}
              color="error.main"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              icon={<GroupIcon sx={{ fontSize: 40 }} />}
              label="Total Employees"
              value={stats.totalEmployees}
              color="success.main"
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default AllCompanyStatsCard;
