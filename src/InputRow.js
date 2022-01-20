import React from 'react';

export const InputRow = ({
  selectedCurrency,
  currencyOptions,
  amount,
  onCurrencyChange,
  onAmountChange,
  label
}) => {
  return (
    <div className='input-row'>
      <label>{label}</label>
      <input
        type="number"
        min="0"
        className="input"
        value={amount}
        onChange={(e) => {
          let val = +(e.target.value);
          val = val >= 0 ? val : 0;
          onAmountChange(val);
        }}
      />
      <select value={selectedCurrency} onChange={onCurrencyChange}>
        {currencyOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
