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
      <div id="box-for-text">
      <p>
        Why bother going through complicated exchanges? Buy cryptocurrency with
        top payment methods like SEPA bank transfer, Credit and Debit Card,
        Apple Pay, Mobile balance or Klarna. You can buy Bitcoin, Ethereum or
        any other popular crypto directly to your personal wallet without making
        any initial deposits. It's as easy as it gets!
      </p>
      </div>
      <ConverterCard />
    </div>
  );
};
