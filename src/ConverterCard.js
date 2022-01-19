import React, { useEffect, useState } from 'react';
import { InputRow } from './InputRow';

const BASE_URL = 'https://api.coingate.com/v2';

export const ConverterCard = () => {
  const [crypoOptions, setCryptoOptions] = useState([]);
  const [fiatOptions, setFiatOptions] = useState([]);
  const [payCurrency, setPayCurrency] = useState('EUR');
  const [buyCurrency, setBuyCurrency] = useState('BTC');
  const [exchangeRate, setExchangeRate] = useState(0);
  const [amount, setAmount] = useState(1);
  const [amountEnteredInPay, setAmountEnteredInPay] = useState(true);

  let buy, pay;
  if (amountEnteredInPay) {
    pay = amount;
    buy = amount * exchangeRate;
  } else {
    buy = amount;
    pay = amount / exchangeRate;
  }

  async function fetchCurrenciesData() {
    fetch(
      `https://cors-anywhere.herokuapp.com/${BASE_URL}/currencies?&kind=crypto`
    )
      .then((res) => res.json())
      .then((data) => {
        const symbols = Object.values(data).map((value) => value.symbol);
        setCryptoOptions(symbols);
      });

    fetch(
      `https://cors-anywhere.herokuapp.com/${BASE_URL}/currencies?&kind=fiat`
    )
      .then((res) => res.json())
      .then((data) => {
        const symbolsFiat = Object.values(data).map((value) => value.symbol);
        setFiatOptions(symbolsFiat);
      });
  }

  useEffect(() => {
    fetchCurrenciesData();
  }, []);

  useEffect(() => {
    fetch(
      `https://cors-anywhere.herokuapp.com/${BASE_URL}/rates/trader/buy/${payCurrency}/${buyCurrency}`
    )
      .then((res) => res.json())
      .then((data) => {setExchangeRate(data);

    console.log(data);})
  }, [payCurrency, buyCurrency]);

  function handlePayAmountChange(e) {
    setAmount(e.target.value);
    setAmountEnteredInPay(true);
  }

  function handleBuyAmountChange(e) {
    setAmount(e.target.value);
    setAmountEnteredInPay(false);
  }

  return (
    <div>
      <InputRow
        selectedCurrency={payCurrency}
        currencyOptions={fiatOptions}
        amount={pay}
        onCurrencyChange={(e) => setPayCurrency(e.target.value)}
        onAmountChange={handlePayAmountChange}
      />
      <InputRow
        selectedCurrency={buyCurrency}
        currencyOptions={crypoOptions}
        amount={buy}
        onCurrencyChange={(e) => setBuyCurrency(e.target.value)}
        onAmountChange={handleBuyAmountChange}
      />
    </div>
  );
};
