import React, { useEffect, useState } from 'react';
import { Stack, Typography, Button, CircularProgress, Snackbar } from '@mui/material';
import { lgpdService } from '../../../../services/lgpdService';
import { authService } from '../../../../services/authService';
import { clienteService } from '../../../../services/clienteService';
import { funcionarioService } from '../../../../services/funcionarioService';

const RequestDataUser: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const fetchUserName = async () => {
    try {
      const userLogged = authService.getUser();

      if (!userLogged) {
        console.error('Usuário não está logado');
        return;
      }

      // Verifica se o usuário logado é cliente ou funcionário
      if (userLogged.tipo === 'cliente') {
        // Busca o cliente pelo ID
        const clienteResponse = await clienteService.getClienteById(userLogged.id);
        setUserName(clienteResponse.primeiro_nome);
      } else if (userLogged.tipo === 'funcionario') {
        // Busca o funcionário pelo ID
        const funcionarioResponse = await funcionarioService.getFuncionarioById(userLogged.id);
        setUserName(funcionarioResponse.primeiro_nome);
      }
    } catch (error) {
      console.error("Erro ao buscar o nome do usuário:", error);
    }
  };

  useEffect(() => {
    fetchUserName();
  }, []);

  const handleRequestData = async () => {
    setLoading(true);
    try {
      // Chama o serviço para obter os dados do usuário
      await lgpdService.getAllUserDataFuncionario(userName);
      
      // Feedback de sucesso
      setFeedbackMessage('Arquivo gerado com sucesso!');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Erro ao solicitar os dados:', error);
      
      // Feedback de erro
      setFeedbackMessage('Erro ao gerar o arquivo!');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack spacing={2} alignItems="center">
      <Typography variant="h5">Solicitar Dados do Usuário</Typography>
      <Typography>Baixe um arquivo JSON com todos os seus dados armazenados no sistema.</Typography>

      {/* Se estiver carregando, exibe o spinner */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleRequestData}
        disabled={loading}
        startIcon={loading ? <CircularProgress size={24} color="inherit" /> : null}
      >
        {loading ? 'Carregando...' : 'Solicitar Dados'}
      </Button>

      {/* Snackbar para feedback do usuário */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={feedbackMessage}
      />
    </Stack>
  );
};

export default RequestDataUser;
