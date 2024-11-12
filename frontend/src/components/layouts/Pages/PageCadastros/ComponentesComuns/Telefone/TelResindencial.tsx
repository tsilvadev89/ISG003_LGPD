import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { z } from 'zod';

const phoneSchema = z.string().regex(
  /^(\(\d{3}\)\s-\s\d{4}-\d{4})$/,
  { message: 'Telefone residencial inválido' }
);

interface ResidentialPhoneInputProps {
  value: string;
  onChange: (value: string) => void;
}

const ResidentialPhoneInput: React.FC<ResidentialPhoneInputProps> = ({ value, onChange }) => {
  const [phoneNumber, setPhoneNumber] = useState(value);
  const [error, setError] = useState<string | null>(null);
  const [hasBlurred, setHasBlurred] = useState(false);

  const formatPhone = (value: string) => {
    const cleanedValue = value.replace(/[^\d]/g, ''); // Remove não dígitos
    let formattedValue = cleanedValue.replace(/(\d{3})(\d{0,4})/, '($1) - $2'); // Adiciona a formatação (000) - 0000
    if (cleanedValue.length > 10) {
      formattedValue = formattedValue.replace(/(\d{4})(\d{1,4})$/, '$1-$2'); // Completa a formatação - 0000
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
    <div>
      <TextField
        label="Telefone Residencial"
        placeholder="(000) - 0000-0000"
        value={phoneNumber}
        onChange={handlePhoneChange}
        onBlur={handleBlur}
        error={isError}
        helperText={isError ? error : ''}
        variant="outlined"
        margin="normal"
      />
    </div>
  );
};

export default ResidentialPhoneInput;
