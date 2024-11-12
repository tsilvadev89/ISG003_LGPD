// RequestDataUser.tsx
import React from 'react';
import { Stack, Typography, Button } from '@mui/material';

interface RequestDataUserProps {
  onRequestData: () => void;
}

const RequestDataUser: React.FC<RequestDataUserProps> = ({ onRequestData }) => {
  return (
    <Stack spacing={2} alignItems="center">
      <Typography variant="h5">Solicitar Dados do Usuário</Typography>
      <Typography>Baixe um arquivo CSV com todos os seus dados armazenados no sistema.</Typography>

      <Button variant="contained" color="primary" onClick={onRequestData}>
        Solicitar Dados
      </Button>
    </Stack>
  );
};

export default RequestDataUser;
