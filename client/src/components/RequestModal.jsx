import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, IconButton, Box, Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';

const RequestModal = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    companyEmail: '',
    industry: '',
    contactPerson: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { companyName, companyEmail, industry, contactPerson, phone } = formData;

    // ✅ Frontend validation
    if (!companyName || !companyEmail || !industry || !contactPerson || !phone) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/request-service', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Request sent successfully!");
        setFormData({
          companyName: '',
          companyEmail: '',
          industry: '',
          contactPerson: '',
          phone: '',
          message: '',
        });
        handleClose();
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ backgroundColor: 'rgb(90, 102, 209)', color: 'white' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Request HRMS Service</Typography>
          <IconButton onClick={handleClose} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ py: 3, backgroundColor: '#f9fafb' }}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Official Email"
              name="companyEmail"
              type="email"
              value={formData.companyEmail}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Contact Person"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Message (Optional)"
              name="message"
              multiline
              minRows={3}
              value={formData.message}
              onChange={handleChange}
              fullWidth
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ backgroundColor: '#f1f5f9', py: 2 }}>
          <Button onClick={handleClose} variant="outlined" color="error">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Submit Request
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default RequestModal;
