// Final OwnerDashboard Layout based on your confirmation

import React from 'react';
import { Box, Grid, Paper } from '@mui/material';
import OwnerSidebar from '../components/OwnerSidebar';
import OwnerTopbar from '../components/OwnerTopbar';
// import AllCompanyStatsCard from '../components/AllCompanyStatsCard';
// import CompanyListTable from '../components/CompanyListTable';
// import BlockedCompaniesList from '../components/BlockedCompaniesList';
// import InviteCompanyForm from '../components/InviteCompanyForm';
// import CompanyRequestTable from '../components/CompanyRequestTable';
// import PendingRequestSection from '../components/PendingRequestSection';

const drawerWidth = 240;

const OwnerDashboard = ({ toggleTheme, mode }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <OwnerSidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        toggleTheme={toggleTheme}
        themeMode={mode}
      />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: 'background.default',
          minHeight: '100vh',
          // marginBottom:'100px'
        }}
      >
        {/* Topbar */}
        <OwnerTopbar onMenuClick={handleDrawerToggle} />

        {/* Cards Section */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            {/* <AllCompanyStatsCard title="Total Companies" statKey="total" /> */}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {/* <AllCompanyStatsCard title="Active Companies" statKey="active" /> */}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {/* <AllCompanyStatsCard title="Blocked Companies" statKey="blocked" /> */}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {/* <AllCompanyStatsCard title="Pending Requests" statKey="pending" /> */}
          </Grid>
        </Grid>

        {/* Invite Form + Requests Table */}
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              {/* <InviteCompanyForm /> */}
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              {/* <CompanyRequestTable /> */}
            </Paper>
          </Grid>
        </Grid>

        {/* Blocked List */}
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 2 }}>
              {/* <BlockedCompaniesList /> */}
            </Paper>
          </Grid>
        </Grid>

        {/* All Company Table */}
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 2 }}>
              {/* <CompanyListTable /> */}
            </Paper>
          </Grid>
        </Grid>

        {/* Tabs and Graph Sections (Placeholder for now) */}
        {/* Future implementation for Charts, Graphs and Tabs */}
      </Box>
    </Box>
  );
};

export default OwnerDashboard;
