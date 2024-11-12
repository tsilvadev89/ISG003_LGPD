// EditPreferences.tsx
import React, { useState } from 'react';
import { Stack, Typography, Switch, FormControlLabel, Button } from '@mui/material';

interface Preferences {
  darkMode: boolean;
  notificationsEnabled: boolean;
}

interface EditPreferencesProps {
  preferences: Preferences;
  onSavePreferences: (updatedPreferences: Preferences) => void;
}

const EditPreferences: React.FC<EditPreferencesProps> = ({ preferences, onSavePreferences }) => {
  const [darkMode, setDarkMode] = useState(preferences.darkMode);
  const [notificationsEnabled, setNotificationsEnabled] = useState(preferences.notificationsEnabled);

  const handleSave = () => {
    onSavePreferences({ darkMode, notificationsEnabled });
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h5">Preferências do Usuário</Typography>

      <FormControlLabel
        control={<Switch checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />}
        label="Modo Escuro"
      />
      <FormControlLabel
        control={<Switch checked={notificationsEnabled} onChange={(e) => setNotificationsEnabled(e.target.checked)} />}
        label="Notificações Ativadas"
      />

      <Button variant="contained" color="primary" onClick={handleSave}>
        Salvar Preferências
      </Button>
    </Stack>
  );
};

export default EditPreferences;
