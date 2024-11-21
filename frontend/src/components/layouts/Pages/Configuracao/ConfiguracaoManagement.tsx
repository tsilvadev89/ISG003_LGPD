import React, { useState, useEffect } from 'react';
import { Stack, Snackbar, Alert, Typography, Tab, Tabs, useMediaQuery, MenuItem, Select, InputLabel, FormControl, Theme, SelectChangeEvent } from '@mui/material';
import EditPreferences from './EditPreferences';
import RequestDataUser from './RequestDataUser';
import DeleteUserPermanent from './DeleteUserPermanent';
import UserManagement from '../PageCadastros/Pessoas/UserManagement';
import { funcionarioService } from '../../../../services/funcionarioService';

const ConfiguracaoManagement: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [preferences, setPreferences] = useState({ darkMode: false, notificationsEnabled: true });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useMediaQuery<Theme>((theme: Theme) => theme.breakpoints.down('sm'));
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkUserStatus = async () => {
      const isFuncionarioUser = await funcionarioService.isFuncionario();
      setIsAdmin(isFuncionarioUser);
    };

    checkUserStatus();
  }, []);

  const handleSavePreferences = (updatedPreferences: typeof preferences) => {
    setPreferences(updatedPreferences);
    setSuccess(true);
  };

  const handleDeleteUser = () => {
    console.log('Excluir usuário permanentemente');
    setSuccess(true);
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  // Corrigido para usar SelectChangeEvent
  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    setSelectedTab(event.target.value as number);
  };

  return (
    <Stack spacing={3} padding={2}>
      <Typography variant="h4">Configurações e Gerenciamento</Typography>

      {isMobile ? (
        <FormControl fullWidth>
          <InputLabel>Selecione uma opção</InputLabel>
          <Select
            value={selectedTab}
            onChange={handleSelectChange}
            label="Selecione uma opção"
          >
            <MenuItem value={0}>Preferências</MenuItem>
            <MenuItem value={1}>Dados do Usuário</MenuItem>
            <MenuItem value={2}>Requisição Dados</MenuItem>
            <MenuItem value={3}>Excluir Conta</MenuItem>
          </Select>
        </FormControl>
      ) : (
        <Tabs value={selectedTab} onChange={handleTabChange} aria-label="Configurações de usuário">
          <Tab label="Preferências" />
          <Tab label="Dados do Usuário" />
          <Tab label="Requisição Dados" />
          <Tab label="Excluir Conta" />
        </Tabs>
      )}

      {selectedTab === 0 && <EditPreferences onPreferencesUpdate={handleSavePreferences} />}
      {selectedTab === 1 && <UserManagement admin={isAdmin} updateOneUser={true} />}
      {selectedTab === 2 && <RequestDataUser />}
      {selectedTab === 3 && <DeleteUserPermanent onDeleteUser={handleDeleteUser} />}

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
