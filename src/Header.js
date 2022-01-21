import React from 'react';
import { AppBar, Box } from '@mui/material';
import coingateLogo from './icons/coingate-logo.png';

export const Header = () => {
  return (
    
    <AppBar position="static" id="header">
      {/* <Box
       
        p={2}
        r={50}
        component="img"
        sx={{
          height: 34,
          flexGrow: 1 
          
        }}
        alt="coingate logo."
        src={coingateLogo}
      />

      */}
      <img src={coingateLogo} alt="icon" size="15" />
    </AppBar>
   


  );
};
