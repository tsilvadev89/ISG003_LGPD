import React, { useState } from 'react';
import {
  Stack,
  Typography,
  Switch,
  FormControlLabel,
  Checkbox,
  Paper,
  Select,
  MenuItem,
  Button,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { WhatsApp, Sms, Email, VolumeUp, WbSunny, DarkMode, Save } from '@mui/icons-material';

interface Preferences {
  darkMode: boolean;
  notificationsEnabled: boolean;
  notificationMethods: string[];
  language: string;
  fontSize: string;
  soundEnabled: boolean;
}

interface EditPreferencesProps {
  onPreferencesUpdate: (preferences: Preferences) => void;
}

const EditPreferences: React.FC<EditPreferencesProps> = ({ onPreferencesUpdate }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Estado local para preferências
  const [preferences, setPreferences] = useState<Preferences>({
    darkMode: false,
    notificationsEnabled: false,
    notificationMethods: [],
    language: 'en',
    fontSize: '16px',
    soundEnabled: true,
  });

  const [saved, setSaved] = useState<boolean>(false); // Estado para controle do feedback de "salvamento"

  // Função para notificar as atualizações ao componente pai
  const handleUpdate = () => {
    onPreferencesUpdate(preferences);
  };

  const handleSavePreferences = () => {
    handleUpdate(); // Envia as preferências atualizadas para o componente pai
    setSaved(true); // Atualiza o estado para indicar que as preferências foram salvas
    setTimeout(() => setSaved(false), 2000); // Reseta a confirmação após 2 segundos
  };

  const handleDarkModeChange = (checked: boolean) => {
    setPreferences((prev) => {
      const updatedPreferences = { ...prev, darkMode: checked };
      return updatedPreferences;
    });
  };

  const handleNotificationsChange = (checked: boolean) => {
    setPreferences((prev) => {
      const updatedPreferences = { ...prev, notificationsEnabled: checked };
      return updatedPreferences;
    });
  };

  const handleNotificationMethodsChange = (method: string) => {
    setPreferences((prev) => {
      const updatedPreferences = {
        ...prev,
        notificationMethods: prev.notificationMethods.includes(method)
          ? prev.notificationMethods.filter((m) => m !== method)
          : [...prev.notificationMethods, method],
      };
      return updatedPreferences;
    });
  };

  const handleLanguageChange = (language: string) => {
    setPreferences((prev) => {
      const updatedPreferences = { ...prev, language };
      return updatedPreferences;
    });
  };

  const handleSoundChange = (checked: boolean) => {
    setPreferences((prev) => {
      const updatedPreferences = { ...prev, soundEnabled: checked };
      return updatedPreferences;
    });
  };

  return (
    <Stack
      spacing={3}
      sx={{
        width: isMobile ? '100%' : '100%',
        margin: '0 auto',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h5" align="center">Preferências do Usuário</Typography>

      <Stack width={'400px'} alignContent={'left'}>
        <FormControlLabel
          control={
            <Switch
              checked={preferences.darkMode}
              onChange={(e) => handleDarkModeChange(e.target.checked)}
              icon={<WbSunny sx={{ color: '#FFE484' }} />}
              checkedIcon={<DarkMode />}
            />
          }
          label={preferences.darkMode ? "Modo Escuro Ativado" : "Modo Claro Ativado"}
          sx={{ color: preferences.darkMode ? 'secondary.main' : 'text.primary' }}
        />

        <FormControlLabel
          control={
            <Switch
              checked={preferences.notificationsEnabled}
              onChange={(e) => handleNotificationsChange(e.target.checked)}
            />
          }
          label="Notificações Ativadas"
          sx={{ color: preferences.notificationsEnabled ? 'secondary.main' : 'text.primary' }}
        />
      </Stack>

      {preferences.notificationsEnabled && (
        <Paper elevation={2} sx={{ padding: 2, width: '100%', maxWidth: 400 }}>
          <Typography variant="subtitle1" gutterBottom>Escolha os Meios de Notificação:</Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={preferences.notificationMethods.includes('whatsapp')}
                onChange={() => handleNotificationMethodsChange('whatsapp')}
                icon={<WhatsApp />}
                checkedIcon={<WhatsApp sx={{ color: 'red' }} />}
              />
            }
            label="WhatsApp"
            sx={{
              color: preferences.notificationMethods.includes('whatsapp') ? 'red' : 'inherit',
            }}

          />
          <FormControlLabel
            control={
              <Checkbox
                checked={preferences.notificationMethods.includes('sms')}
                onChange={() => handleNotificationMethodsChange('sms')}
                icon={<Sms />}
                checkedIcon={<Sms sx={{ color: 'red' }} />}
              />
            }
            label="SMS"
            sx={{
              color: preferences.notificationMethods.includes('sms') ? 'red' : 'inherit',
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={preferences.notificationMethods.includes('email')}
                onChange={() => handleNotificationMethodsChange('email')}
                icon={<Email />}
                checkedIcon={<Email sx={{ color: 'red' }} />}
              />
            }
            label="Email"
            sx={{
              color: preferences.notificationMethods.includes('email') ? 'red' : 'inherit',
            }}
          />
        </Paper>
      )}

      <Stack width={'400px'} alignContent={'left'}>
        <Typography variant="subtitle1" gutterBottom>Idioma:</Typography>
        <Select
          value={preferences.language}
          onChange={(e) => handleLanguageChange(e.target.value)}
          fullWidth
        >
          <MenuItem value="en">Inglês</MenuItem>
          <MenuItem value="pt">Português</MenuItem>
        </Select>

        <Typography variant="subtitle1" gutterBottom>Font Size:</Typography>
        <Select
          value={preferences.fontSize}
          onChange={(e) => handleLanguageChange(e.target.value)}
          fullWidth
        >
          <MenuItem value="8px">Pequeno</MenuItem>
          <MenuItem value="16px">Médio</MenuItem>
          <MenuItem value="32px">Grande</MenuItem>
        </Select>

        <FormControlLabel
          control={
            <Switch
              checked={preferences.soundEnabled}
              onChange={(e) => handleSoundChange(e.target.checked)}
              icon={<VolumeUp />}
              checkedIcon={<VolumeUp />}
            />
          }
          label="Som Ativado"
        />
      </Stack>

      <Tooltip title={saved ? 'Preferências Salvas!' : 'Salvar Preferências'} arrow>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSavePreferences}
          startIcon={<Save />}
          sx={{
            marginTop: 2,
            color: 'white',
            backgroundColor: saved ? 'green' : 'primary.main',
          }}
        >
          {saved ? 'Preferências Salvas' : 'Salvar Preferências'}
        </Button>
      </Tooltip>
    </Stack>
  );
};

export default EditPreferences;
