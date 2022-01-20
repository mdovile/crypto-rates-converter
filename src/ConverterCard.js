import React, { useEffect, useState } from 'react';
import { InputRow } from './InputRow';
import { FormControl, Select, MenuItem, Button, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'https://api.coingate.com/v2';
const paymentOptions = ['Bank transfer', 'Credit or Debit Card', 'Apple Pay'];

export const ConverterCard = () => {
  const [crypoOptions, setCryptoOptions] = useState([]);
  const [fiatOptions, setFiatOptions] = useState([]);
  const [payCurrency, setPayCurrency] = useState('EUR');
  const [buyCurrency, setBuyCurrency] = useState('BTC');
  const [exchangeRate, setExchangeRate] = useState(0);
  const [amount, setAmount] = useState(0);
  const [amountEnteredInPay, setAmountEnteredInPay] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState(paymentOptions[0]);
  const navigate = useNavigate();

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
      .then((data) => setExchangeRate(data));
  }, [payCurrency, buyCurrency]);

  function handlePayAmountChange(val) {
    setAmount(val);
    setAmountEnteredInPay(true);
  }
  
  function handleBuyAmountChange(val) {
    setAmount(val);
    setAmountEnteredInPay(false);
  }

  function handleSubmit() {
    navigate('/buy');
  }

  return (
    <Card id="converter-card">
      <form onSubmit={handleSubmit} id="converter-card__form">
        <div id="input-fields">
          <InputRow
            selectedCurrency={payCurrency}
            currencyOptions={fiatOptions}
            amount={pay}
            onCurrencyChange={(e) => setPayCurrency(e.target.value)}
            onAmountChange={handlePayAmountChange}
            label={'Pay'}
          />
          <InputRow
            selectedCurrency={buyCurrency}
            currencyOptions={crypoOptions}
            amount={buy}
            onCurrencyChange={(e) => setBuyCurrency(e.target.value)}
            onAmountChange={handleBuyAmountChange}
            label="Buy"
          />
          <label id="payment-label">Payment Method</label>
          <select
            id="payment-select"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            {paymentOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <Button
          id="buy-button"
          type="submit"
          disabled={!paymentMethod || buy == 0 || pay == 0}
        >
          Buy {buyCurrency}
        </Button>
      </form>
    </Card>
  );
};
