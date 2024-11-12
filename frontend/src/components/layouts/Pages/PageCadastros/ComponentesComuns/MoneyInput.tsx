import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { z } from 'zod';

const MoneySchema = z.string().regex(/^R\$ ?\d{1,3}(\.\d{3})*,\d{2}$/, {
  message: 'Valor monetário inválido',
});

const MoneyInput = () => {
  const [money, setMoney] = useState('R$ ');
  const [error, setError] = useState<string | null>(null);
  const [hasBlurred, setHasBlurred] = useState(false);

  const formatMoney = (value: string) => {
    const cleanedValue = value.replace(/[^\d,]/g, '');
    const parts = cleanedValue.split(',');

    let integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    let decimalPart = '';

    if (parts.length > 1) {
      decimalPart = `,${parts[1].substring(0, 2)}`;
    }

    return `R$ ${integerPart}${decimalPart}`;
  };

  const handleMoneyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const formattedValue = formatMoney(value);
    setMoney(formattedValue);
    setError(null);
  };

  const handleBlur = () => {
    setHasBlurred(true);
    try {
      MoneySchema.parse(money);
      setError(null);
    } catch (validationError: unknown) {
      if (validationError instanceof z.ZodError) {
        const message = validationError.errors[0]?.message ?? 'Erro de validação';
        setError(message);
      }
    }
  };

  const isError = hasBlurred && !!error;

  return (
    <div>
      <TextField
        label="Valor Monetário"
        value={money}
        onChange={handleMoneyChange}
        onBlur={handleBlur}
        error={isError}
        helperText={isError ? error : ''}
        variant="outlined"
        margin="normal"
      />
    </div>
  );
};

export default MoneyInput;
