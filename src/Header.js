import React from 'react';
import coingateLogo from './icons/coingate-logo.png';

export const Header = () => {
  return (
    <div id="header">
      <img className="logo-icon" src={coingateLogo} alt="coingate logo" />
    </div>
  );
};
