import React, { useState } from 'react';
import { Stack, TextField } from '@mui/material';
import { z } from 'zod';

const phoneSchema = z.string().regex(
  /^(\(\d{3}\)\s-\s\d{5}-\d{4})$/,
  { message: 'Celular inválido' }
);

interface CellPhoneInputProps {
  value: string;
  onChange: (value: string) => void;
}

const CellPhoneInput: React.FC<CellPhoneInputProps> = ({ value, onChange }) => {
  const [phoneNumber, setPhoneNumber] = useState(value);
  const [error, setError] = useState<string | null>(null);
  const [hasBlurred, setHasBlurred] = useState(false);

  const formatPhone = (value: string) => {
    const cleanedValue = value.replace(/[^\d]/g, ''); // Remove não dígitos
    let formattedValue = cleanedValue.replace(/(\d{3})(\d{0,5})/, '($1) - $2'); // Adiciona a formatação (000) - 00000
    if (cleanedValue.length > 10) {
      formattedValue = formattedValue.replace(/(\d{5})(\d{1,4})$/, '$1-$2'); // Completa a formatação - 0000
    }
    return formattedValue;
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const formattedPhone = formatPhone(newValue);
    setPhoneNumber(formattedPhone);
    onChange(formattedPhone);
    setError(null);
  };

  const handleBlur = () => {
    setHasBlurred(true);
    try {
      phoneSchema.parse(phoneNumber);
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
    <Stack margin={0}>
      <TextField
        label="Celular"
        placeholder="(000) - 00000-0000"
        value={phoneNumber}
        onChange={handlePhoneChange}
        onBlur={handleBlur}
        error={isError}
        helperText={isError ? error : ''}
        variant="outlined"
        margin="normal"
      />
    </Stack>
  );
};

export default CellPhoneInput;
