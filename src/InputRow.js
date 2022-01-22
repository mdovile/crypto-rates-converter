import React, { useState, useEffect } from 'react';
import { Select, MenuItem, Input } from '@mui/material';
import unknownLogo from './icons/icons-unknown.png';

export const InputRow = ({
  selectedCurrency,
  currencyOptions,
  amount,
  onCurrencyChange,
  onAmountChange,
  label,
}) => {
  const [image, setImage] = useState();

  useEffect(() => {
    fetch(
      `https://cors-anywhere.herokuapp.com/https://cryptoicons.org/api/icon/${selectedCurrency.toLowerCase()}/200`
    )
      .then((response) => {
        if (response.ok) {
          return response.blob();
        } else {
          setImage(unknownLogo);
        }
      })
      .then((imageBlob) => {
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImage(imageObjectURL);
      }).catch((error) => {
        setImage(unknownLogo);
      });
  }, [selectedCurrency]);

  return (
    <div className="input-row">
      <label className="input-label">{label}</label>
      <Input
        disableUnderline={true} 
        variant="standard"
        inputProps={{ min: 0, max: 1000000, style: { textAlign: 'center', fontSize: 14 }}}
        type="number"
        min="0"
        className="inputNumber"
        value={amount}
        onChange={(e) => {
          let val = +e.target.value;
          val = val >= 0 ? val : 0;
          onAmountChange(val);
        }}
      />
      <Select
        variant="standard"
        disableUnderline={true} 
        className="currency-select"
        value={selectedCurrency}
        onChange={onCurrencyChange}
        IconComponent={() => (
          <img className="currency-icon" src={image} alt="icon" />
        )}
      >
        {currencyOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};
