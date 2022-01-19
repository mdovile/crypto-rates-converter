import React from 'react';

export const InputRow = ({
  selectedCurrency,
  currencyOptions,
  amount,
  onCurrencyChange,
  onAmountChange,
}) => {
  return (
    <div>
      <input
        type="number"
        className="input"
        value={amount}
        onChange={onAmountChange}
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
