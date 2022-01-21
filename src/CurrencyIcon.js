import React, { useState, useEffect, useRef } from 'react';

export const CurrencyIcon = ({ name, size=16}) => {
  const importedIconRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const importIcon = async () => {
    
        const { default: namedImport } = await require(`./../node_modules/cryptocurrency-icons/32/color/${name.toLowerCase()}.png`);
        importedIconRef.current = namedImport;
        setLoading(false);
    };
    importIcon();
  }, [name]);

  if (!loading && importedIconRef.current) {
    const { current: ImportedIcon } = importedIconRef;
    return <img src={ImportedIcon} width={size} height={size} />;
  }

  return null;
};
     