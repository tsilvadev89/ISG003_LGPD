// DeleteUserPermanent.tsx
import React, { useState } from 'react';
import { Stack, Typography, Button, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface DeleteUserPermanentProps {
  onDeleteUser: () => void;
}

const DeleteUserPermanent: React.FC<DeleteUserPermanentProps> = ({ onDeleteUser }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);
  const handleConfirmDelete = () => {
    onDeleteUser();
    setIsDialogOpen(false);
  };

  return (
    <Stack spacing={2} alignItems="center">
      <Typography variant="h5" color="error">
        Excluir Conta Permanentemente
      </Typography>
      <Alert severity="warning">
        Atenção: Esta ação é irreversível. Todos os seus dados serão excluídos permanentemente.
      </Alert>

      <Button variant="contained" color="error" onClick={handleOpenDialog}>
        Excluir Conta
      </Button>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Confirmação de Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>Tem certeza de que deseja excluir permanentemente sua conta?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default DeleteUserPermanent;
