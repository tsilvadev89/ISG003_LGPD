import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { z } from 'zod';

const CPFSchema = z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: 'CPF inválido' });

const CPFInput = () => {
  const [cpf, setCPF] = useState('___.___.___-__');
  const [error, setError] = useState<string | null>(null);
  const [hasBlurred, setHasBlurred] = useState(false);

  const handleCPFChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const containsLetters = /[a-zA-Z]/.test(value); // Verifica se há letras

    if (containsLetters) {
      setError('Apenas números são permitidos');
      return; // Interrompe a execução se letras forem encontradas
    }

    const formattedValue = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    setCPF(formattedValue.padEnd(11, '_').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'));
    setError(null); //Limpa erro
  };

  const handleBlur = () => {
    setHasBlurred(true);
    try {
      CPFSchema.parse(cpf);
      setError(null);
    } catch (validationError: any) {
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
        label="CPF"
        value={cpf}
        onChange={handleCPFChange}
        onBlur={handleBlur}
        error={isError}
        helperText={isError ? error : ''}
        variant="outlined"
        margin="normal"
      />
    </div>
  );
};

export default CPFInput;
