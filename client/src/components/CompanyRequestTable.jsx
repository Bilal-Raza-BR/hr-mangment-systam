import React, { useEffect, useState } from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Typography
} from '@mui/material';
import { toast } from 'react-toastify';

const CompanyRequestTable = () => {
  const [requests, setRequests] = useState([]);

  // Get all pending company requests
  const fetchRequests = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/request-service/all");
      const data = await res.json();
      if (res.ok) {
        setRequests(data.requests);
      } else {
        toast.error(data.message || "Failed to fetch requests");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server Error");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Approve request
  const handleApprove = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/request-service/approve/${id}`, {
        method: "PUT"
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Approved successfully");
        fetchRequests();
      } else {
        toast.error(data.message || "Failed to approve");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  // Reject request
  const handleReject = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/request-service/reject/${id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Request rejected");
        fetchRequests();
      } else {
        toast.error(data.message || "Failed to reject");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2} fontWeight="bold">
        Pending Service Requests
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#1e3a8a' }}>
            <TableRow>
              <TableCell sx={{ color: "#fff" }}>Company</TableCell>
              <TableCell sx={{ color: "#fff" }}>Email</TableCell>
              <TableCell sx={{ color: "#fff" }}>Industry</TableCell>
              <TableCell sx={{ color: "#fff" }}>Contact</TableCell>
              <TableCell sx={{ color: "#fff" }}>Phone</TableCell>
              <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.length > 0 ? (
              requests.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row.companyName}</TableCell>
                  <TableCell>{row.companyEmail}</TableCell>
                  <TableCell>{row.industry}</TableCell>
                  <TableCell>{row.contactPerson}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() => handleApprove(row._id)}
                      sx={{ mr: 1 }}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleReject(row._id)}
                    >
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No pending requests.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CompanyRequestTable;
