import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  CircularProgress
} from '@mui/material';
import { toast } from 'react-toastify';

const BlockedCompaniesList = () => {
  const [blockedCompanies, setBlockedCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBlockedCompanies = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/owner/blocked-companies');
      const data = await res.json();
      if (res.ok) {
        setBlockedCompanies(data.blockedCompanies);
      } else {
        toast.error(data.message || "Failed to fetch data");
      }
    } catch (err) {
      toast.error("Server error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUnblock = async (companyId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/owner/unblock-company/${companyId}`, {
        method: 'PATCH'
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Company unblocked successfully!");
        fetchBlockedCompanies(); // Refresh list
      } else {
        toast.error(data.message || "Failed to unblock");
      }
    } catch (err) {
      toast.error("Server error");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlockedCompanies();
  }, []);

  return (
    <Paper elevation={6} sx={{ p: 4, mt: 4, borderRadius: 4 }}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Blocked Companies
      </Typography>

      {loading ? (
        <Box textAlign="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : blockedCompanies.length === 0 ? (
        <Typography color="text.secondary">No blocked companies found.</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Industry</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blockedCompanies.map((company) => (
              <TableRow key={company._id}>
                <TableCell>{company.companyName}</TableCell>
                <TableCell>{company.companyEmail}</TableCell>
                <TableCell>{company.industry}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={() => handleUnblock(company._id)}
                  >
                    Unblock
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
};

export default BlockedCompaniesList;
