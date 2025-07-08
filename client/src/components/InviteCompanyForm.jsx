import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper
} from '@mui/material';
import { toast } from 'react-toastify';

const InviteCompanyForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    companyName: '',
    industry: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, companyName, industry } = formData;
    if (!email || !companyName || !industry) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/owner/invite-company', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Invitation sent successfully!");
        setFormData({ email: '', companyName: '', industry: '' });
      } else {
        toast.error(data.message || "Failed to send invite");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  return (
    <Paper elevation={6} sx={{ p: 4, borderRadius: 4, mt: 4 }}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Invite a New Company
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Company Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Company Name"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Industry"
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          margin="normal"
          required
        />

        <Box textAlign="right" mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Send Invite
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default InviteCompanyForm;
 