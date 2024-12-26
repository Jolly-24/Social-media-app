'use client'

import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { useAppSelector } from '@/Hooks/store.hook'; // Adjust path if needed

const Footer = () => {
  const { token } = useAppSelector((store) => store.userReducer);

  return (
    <>
      {token && (
        <Box sx={{ backgroundColor: 'cadetblue', padding: 2, textAlign: 'center',color:"white" }}>
          <Typography variant="body2" color="inherit">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </Typography>
          <Typography variant="body2" color="inherit">
            <Link href="/" color="inherit">
              Home
            </Link>
            {' | '}
            <Link href="/about" color="inherit">
              About Us
            </Link>
            {' | '}
            <Link href="/contact" color="inherit">
              Contact
            </Link>
          </Typography>
        </Box>
      )}
    </>
  );
};

export default Footer;
