import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { z } from 'zod';

const NameSchema = z
  .string()
  .min(2, { message: 'O nome deve ter no mínimo 2 caracteres' })
  .regex(/^[A-Za-z]+$/, { message: 'O nome deve conter somente letras' });

const NameInput = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [hasBlurred, setHasBlurred] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleBlur = () => {
    setHasBlurred(true);
    try {
      NameSchema.parse(name);
      setError(null);
    } catch (validationError: unknown) {
      if (validationError instanceof z.ZodError) {
        const message = validationError.errors[0]?.message ?? 'Erro de validação';
        setError(message);
      }
    }
  };

  return (
    <div>
      <TextField
        label="Nome"
        value={name}
        onChange={handleNameChange}
        onBlur={handleBlur}
        error={hasBlurred && !!error}
        helperText={hasBlurred ? error : ''}
        variant="outlined"
        margin="normal"
      />
    </div>
  );
};

export default NameInput;
