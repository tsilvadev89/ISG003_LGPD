import React, { useState, useEffect } from 'react';
import { Cliente } from '../../../../models/Cliente';
import { Funcionario } from '../../../../models/Funcionario';
import { Stack, Snackbar, Alert, Typography, Tab, Tabs, useMediaQuery } from '@mui/material';
import EditPreferences from './EditPreferences';
import EditCurrentUser from './EditCurrentUser';
import RequestDataUser from './RequestDataUser';
import DeleteUserPermanent from './DeleteUserPermanent';

const ConfiguracaoManagement: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0); // Estado para controlar a aba selecionada
  const [preferences, setPreferences] = useState({ darkMode: false, notificationsEnabled: true });
  const [user, setUser] = useState<Cliente | Funcionario | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isMobile = useMediaQuery('(max-width:600px)');

  // Mock para carregar o usuário atual (substitua pelo seu fetch real)
  useEffect(() => {
    setUser({
      cliente_id: 1,
      primeiro_nome: 'João',
      sobrenome: 'Silva',
      email: 'joao.silva@example.com',
      data_nascimento: '1990-01-01',
    } as Cliente);
  }, []);

  // Funções para manipular preferências, dados do usuário, e exclusão
  const handleSavePreferences = (updatedPreferences: typeof preferences) => {
    setPreferences(updatedPreferences);
    setSuccess(true);
  };

  const handleSaveUser = (updatedUser: Cliente | Funcionario) => {
    setUser(updatedUser);
    setSuccess(true);
  };

  const handleRequestData = () => {
    console.log('Solicitar dados do usuário em CSV');
    setSuccess(true);
  };

  const handleDeleteUser = () => {
    console.log('Excluir usuário permanentemente');
    setSuccess(true);
  };

  // Função para mudar de aba
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Stack spacing={3} padding={2}>
      <Typography variant="h4">Configurações e Gerenciamento</Typography>

      {/* Tabs para alternar entre as seções */}
      <Tabs value={selectedTab} onChange={handleTabChange} aria-label="Configurações de usuário">
        <Tab label="Preferências" />
        <Tab label="Dados do Usuário" />
        <Tab label="Requisição Dados" />
        <Tab label="Excluir Conta" />
      </Tabs>

      {/* Condicional para renderizar conteúdo dependendo da aba selecionada */}
      {selectedTab === 0 && (
        <EditPreferences preferences={preferences} onSavePreferences={handleSavePreferences} />
      )}

      {selectedTab === 1 && (
        <EditCurrentUser user={user} onSaveUser={handleSaveUser} />
      )}



      {selectedTab === 2 && (
        <RequestDataUser onRequestData={handleRequestData} />
      )}


      {selectedTab === 3 && (
        <DeleteUserPermanent onDeleteUser={handleDeleteUser} />
      )}

      {success && (
        <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
          <Alert onClose={() => setSuccess(false)} severity="success">
            Operação realizada com sucesso!
          </Alert>
        </Snackbar>
      )}

      {error && (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
          <Alert onClose={() => setError(null)} severity="error">
            {error}
          </Alert>
        </Snackbar>
      )}
    </Stack>
  );
};

export default ConfiguracaoManagement;
