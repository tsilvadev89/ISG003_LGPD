import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { z } from 'zod';

const RGSchema = z.string().regex(
  /^(\w{2}\.\w{3}\.\w{3}-\w{2})|(\w{10}-\w{1})$/,
  { message: 'Documento inválido' }
);

const RGInput = () => {
  const [rg, setRG] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [hasBlurred, setHasBlurred] = useState(false);

  const formatRG = (value: string) => {
    const cleanedValue = value.replace(/[^\w]/g, '').toUpperCase(); // Remove caracteres especiais e torna maiúsculo
    if (cleanedValue.length <= 10) {
      return cleanedValue.replace(/(\w{2})(\w{3})(\w{3})(\w{2})/, '$1.$2.$3-$4'); // Modelo 1
    } else {
      return cleanedValue.replace(/(\w{10})(\w{1})/, '$1-$2'); // Modelo 2
    }
  };

  const countAlphanumericCharacters = (value: string) => {
    return value.replace(/[^\w]/g, '').length;
  };
  
  const handleRGChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (countAlphanumericCharacters(value) <= 11) {
      setRG(formatRG(value)); 
      setError(null);
    }
  };
  
  const handleBlur = () => {
    setHasBlurred(true);
    try {
      const formattedRG = formatRG(rg); // Formata o RG antes da validação
      RGSchema.parse(formattedRG); // Validação do RG formatado
      setRG(formattedRG); // Atualiza o estado com o RG formatado
      setError(null);
    } catch (validationError: unknown) {
      if (validationError instanceof z.ZodError) {
        const message = validationError.errors[0]?.message ?? 'Erro de validação';
        setError(message);
      }
    }
  };

  const getLabel = (value: string) => {
    if (countAlphanumericCharacters(value) > 10) {
      return 'RIC';
    } else {
      return 'RG';
    }
  };
  const isError = hasBlurred && !!error;

  return (
    <div>
      <TextField
        label={getLabel(rg)}
        value={rg}
        onChange={handleRGChange}
        onBlur={handleBlur}
        error={isError}
        helperText={isError ? error : ''}
        variant="outlined"
        margin="normal"
      />
    </div>
  );
};

export default RGInput;
