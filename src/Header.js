import React from 'react';
import coingateLogo from './icons/coingate-logo.png';

export const Header = () => {
  return (
    <div position="static" id="header">
     
     <img className="logo-icon" src={coingateLogo} alt="coingate logo" />
    </div>
  );
};
