import React from 'react';
import { Cliente } from '../../../../../models/Cliente';
import { Card, CardContent, Stack, Typography, Avatar, Box } from '@mui/material';

interface UserCardListUserProps {
  clientes: Cliente[];
  onEdit: (cliente: Cliente) => void;
}

const UserCardListUser: React.FC<UserCardListUserProps> = ({ clientes, onEdit }) => {
  return (
    <Stack spacing={2}>
      {clientes.map((cliente) => (
        <Card key={cliente.cliente_id} variant="outlined">
          <Box onClick={() => onEdit(cliente)} sx={{ cursor: 'pointer' }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar src={cliente.imagem_url} alt={cliente.primeiro_nome} />
                <div>
                  <Typography variant="h6">
                    {cliente.primeiro_nome} {cliente.sobrenome}
                  </Typography>
                  <Typography color="textSecondary">{cliente.email}</Typography>
                  <Typography color="textSecondary">
                    Data de Nascimento: {new Date(cliente.data_nascimento).toLocaleDateString()}
                  </Typography>
                </div>
              </Stack>
            </CardContent>
          </Box>
        </Card>
      ))}
    </Stack>
  );
};

export default UserCardListUser;
