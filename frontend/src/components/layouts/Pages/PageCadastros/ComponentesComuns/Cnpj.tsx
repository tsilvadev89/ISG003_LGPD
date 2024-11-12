import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { z } from 'zod';

const CNPJSchema = z.string().regex(
  /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
  { message: 'CNPJ inválido' }
);

const CNPJInput = () => {
  const [cnpj, setCNPJ] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [hasBlurred, setHasBlurred] = useState(false);

  const formatCNPJ = (value: string) => {
    const cleanedValue = value.replace(/[^\d]/g, ''); // Remove não dígitos
    return cleanedValue.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      '$1.$2.$3/$4-$5'
    );
  };

  const handleCNPJChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const formattedCNPJ = formatCNPJ(newValue);
    setCNPJ(formattedCNPJ);
    setError(null);
  };

  const handleBlur = () => {
    setHasBlurred(true);
    try {
      CNPJSchema.parse(cnpj);
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
        label="CNPJ"
        value={cnpj}
        onChange={handleCNPJChange}
        onBlur={handleBlur}
        error={isError}
        helperText={isError ? error : ''}
        variant="outlined"
        margin="normal"
      />
    </div>
  );
};

export default CNPJInput;
