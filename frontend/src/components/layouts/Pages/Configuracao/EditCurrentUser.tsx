// EditCurrentUser.tsx
import React, { useState } from 'react';
import { Stack, TextField, Button, Typography, Alert } from '@mui/material';
import { Cliente } from '../../../../models/Cliente';
import { Funcionario } from '../../../../models/Funcionario';

interface EditCurrentUserProps {
  user: Cliente | Funcionario | null;
  onSaveUser: (updatedUser: Cliente | Funcionario) => void;
}

const EditCurrentUser: React.FC<EditCurrentUserProps> = ({ user, onSaveUser }) => {
  const [firstName, setFirstName] = useState('user.primeiro_nome');
  const [lastName, setLastName] = useState('user.sobrenome');
  const [email, setEmail] = useState('user.email');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    if (password !== confirmPassword) {
      setError('As senhas não correspondem');
      return;
    }

    const updatedUser = { ...user, primeiro_nome: firstName, sobrenome: lastName, email, senha: password };
    onSaveUser(updatedUser);
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h5">Editar Perfil</Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <TextField label="Primeiro Nome" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <TextField label="Sobrenome" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <TextField label="Confirmar Senha" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

      <Button variant="contained" color="primary" onClick={handleSave}>
        Salvar Alterações
      </Button>
    </Stack>
  );
};

export default EditCurrentUser;
