import React from 'react';
import { Funcionario } from '../../../../../models/Funcionario';
import { Cargo } from '../../../../../models/Cargo';
import { Card, CardContent, Stack, Typography, Avatar, Box } from '@mui/material';

interface UserCardListFuncProps {
  funcionarios: Funcionario[];
  cargos: Cargo[];
  onEdit: (funcionario: Funcionario) => void;
}

const UserCardListFunc: React.FC<UserCardListFuncProps> = ({ funcionarios, cargos, onEdit }) => {
  const getCargoNome = (cargoId: number) => {
    const cargo = cargos.find((c) => c.cargo_id === cargoId);
    return cargo ? cargo.nome : 'Cargo não encontrado';
  };

  return (
    <Stack spacing={2}>
      {funcionarios.map((funcionario) => (
        <Card key={funcionario.funcionario_id} variant="outlined">
          <Box onClick={() => onEdit(funcionario)} sx={{ cursor: 'pointer' }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar src={funcionario.imagem_url} alt={funcionario.primeiro_nome} />
                <div>
                  <Typography variant="h6">
                    {funcionario.primeiro_nome} {funcionario.sobrenome}
                  </Typography>
                  <Typography color="textSecondary">{funcionario.email}</Typography>
                  <Typography color="textSecondary">
                    Cargo: {getCargoNome(funcionario.cargo_id)}
                  </Typography>
                  <Typography color="textSecondary">
                    Data de Contratação: {new Date(funcionario.data_contratacao).toLocaleDateString()}
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

export default UserCardListFunc;
