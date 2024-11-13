import React, { useState, useEffect } from 'react';
import { Stack, Typography, Button, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Snackbar } from '@mui/material';
import { clienteService } from '../../../../services/clienteService';
import { funcionarioService } from '../../../../services/funcionarioService';
import { authService } from '../../../../services/authService';
import { useNavigate } from 'react-router-dom';

interface DeleteUserPermanentProps {
  onDeleteUser: () => void;
}

const DeleteUserPermanent: React.FC<DeleteUserPermanentProps> = ({ onDeleteUser }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userName, setUserName] = useState<string>(''); // Nome de exibição
  const [fullName, setFullName] = useState<string>(''); // Nome completo do usuário
  const [nameInput, setNameInput] = useState<string>(''); // Nome digitado pelo usuário
  const [error, setError] = useState<string>(''); // Mensagem de erro
  const [success, setSuccess] = useState<boolean>(false); // Flag de sucesso
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false); // Controlar snackbar

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);
  const navigate = useNavigate();

  // Função para buscar o nome do usuário logado
  const fetchUserName = async () => {
    try {
      const userLogged = authService.getUser();
      if (!userLogged) {
        console.error('Usuário não está logado');
        return;
      }

      // Verifica se o usuário logado é cliente ou funcionário
      if (userLogged.tipo === 'cliente') {
        const clienteResponse = await clienteService.getClienteById(userLogged.id);
        setUserName(clienteResponse.primeiro_nome);
        setFullName(`${clienteResponse.primeiro_nome} ${clienteResponse.sobrenome}`);
      } else if (userLogged.tipo === 'funcionario') {
        const funcionarioResponse = await funcionarioService.getFuncionarioById(userLogged.id);
        setUserName(funcionarioResponse.primeiro_nome);
        setFullName(`${funcionarioResponse.primeiro_nome} ${funcionarioResponse.sobrenome}`);
      }
    } catch (error) {
      console.error("Erro ao buscar o nome do usuário:", error);
    }
  };

  useEffect(() => {
    fetchUserName();
  }, []);

  const handleLogout = () => {
    authService.logout();

    // Exibe a mensagem de sucesso
    setOpenSnackbar(true);

    // Passa o parâmetro através do navigate
    setTimeout(() => {
      navigate('/', {
        state: {
          message: `Usuario ${userName} DELETADO com sucesso`
        }
      });
    }, 400);
  };

  const handleDeleteConfirmed = async () => {
    const userLogged = authService.getUser();
    if (!userLogged) {
      console.error('Usuário não está logado');
      return;
    }

    // Verifica se o nome digitado pelo usuário corresponde ao nome completo
    if (nameInput !== fullName) {
      setError('O nome digitado não corresponde ao seu nome completo. Tente novamente.');
      return;
    }

    try {
      // Condição para verificar se é cliente ou funcionário e excluir
      if (userLogged.tipo === 'cliente') {
        await clienteService.deleteCliente(userLogged.id);
      } else if (userLogged.tipo === 'funcionario') {
        await funcionarioService.deleteFuncionario(userLogged.id);
      }

      // Caso de sucesso
      setSuccess(true);
      setError('');  // Limpa qualquer erro anterior

      setOpenSnackbar(true);

      // Chama a função de callback (onDeleteUser)
      onDeleteUser();
      handleLogout();
    } catch (error) {
      // Caso de erro
      setError(`Erro ao excluir ${userLogged.tipo === 'cliente' ? 'cliente' : 'funcionário'}.`);
      setSuccess(false);
      setOpenSnackbar(true);
    }
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

        <DialogTitle>
          <Typography align='center' color='error' variant='h4'>Confirmação de Exclusão</Typography>
        </DialogTitle>

        <DialogContent >
          <DialogContentText>
            <Typography variant='h5' align='center'>{fullName} tem certeza de que deseja excluir permanentemente sua conta?</Typography>
            <Typography variant='h6' align='center' color='error' paddingTop={'1rem'}>ESSA AÇÃO É IRREVERSIVEL</Typography>

          </DialogContentText>
          <Typography variant="subtitle1" color="textSecondary">

          </Typography>
          <TextField
            label="Digite seu nome completo para confirmar"
            variant="outlined"
            fullWidth
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            error={!!error}
            helperText={error}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button size='medium' variant="contained" onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button size='medium' variant="contained" onClick={handleDeleteConfirmed} color="error" autoFocus>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={success ? 'Conta excluída com sucesso.' : error}
      />
    </Stack>
  );
};

export default DeleteUserPermanent;
