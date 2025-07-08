import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Paper, Button, Grid, CircularProgress, Dialog, DialogTitle,
  DialogContent, TextField, DialogActions
} from '@mui/material';
import { toast } from 'react-toastify';

const PendingRequestsSection = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inviteData, setInviteData] = useState(null); // For modal

  // Fetch pending requests
  const fetchRequests = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/owner/requests');
      const data = await res.json();
      if (res.ok) {
        setRequests(data);
      } else {
        toast.error(data.message || "Failed to load requests");
      }
    } catch (err) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Handle reject
  const handleReject = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/owner/reject/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        fetchRequests(); // Refresh
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  // Handle invite form submit
  const handleInvite = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/owner/invite`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inviteData),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        setInviteData(null);
        fetchRequests();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Invite failed");
    }
  };

  return (
    <Box mt={4}>
      <Typography variant="h5" mb={2}>Pending Company Requests</Typography>

      {loading ? (
        <CircularProgress />
      ) : requests.length === 0 ? (
        <Typography>No pending requests found.</Typography>
      ) : (
        <Grid container spacing={2}>
          {requests.map(req => (
            <Grid item xs={12} md={6} key={req._id}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6">{req.companyName}</Typography>
                <Typography>Email: {req.companyEmail}</Typography>
                <Typography>Industry: {req.industry}</Typography>
                <Typography>Contact: {req.contactPerson} ({req.phone})</Typography>
                <Typography>Message: {req.message || '---'}</Typography>

                <Box mt={2} display="flex" gap={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setInviteData({
                      requestId: req._id,
                      companyName: req.companyName,
                      companyEmail: req.companyEmail,
                      industry: req.industry
                    })}
                  >
                    Approve & Invite
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleReject(req._id)}
                  >
                    Reject
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Invite Modal */}
      <Dialog open={!!inviteData} onClose={() => setInviteData(null)} fullWidth maxWidth="sm">
        <DialogTitle>Invite Company</DialogTitle>
        <DialogContent>
          <TextField
            label="Company Name"
            fullWidth
            margin="normal"
            value={inviteData?.companyName || ''}
            onChange={(e) => setInviteData({ ...inviteData, companyName: e.target.value })}
          />
          <TextField
            label="Company Email"
            fullWidth
            margin="normal"
            value={inviteData?.companyEmail || ''}
            onChange={(e) => setInviteData({ ...inviteData, companyEmail: e.target.value })}
          />
          <TextField
            label="Industry"
            fullWidth
            margin="normal"
            value={inviteData?.industry || ''}
            onChange={(e) => setInviteData({ ...inviteData, industry: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInviteData(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleInvite}>Send Invite</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PendingRequestsSection;
