import React from 'react';
import { ConverterCard } from './ConverterCard';

export const HomePage = () => {
  return (
    <div>
      <div id="background" />
      <div id="h1box">
        <h1>
          <b>Buy Bitcoin,</b> Ethereum, <br /> Litecoin and other <br /> crypto{' '}
          <b>online</b>
        </h1>
      </div>
      <ConverterCard />
    </div>
  );
};
